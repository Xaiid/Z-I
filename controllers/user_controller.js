var mongoose   = require('mongoose');
var userSchema = require('../models/user');
var roomSchema = require('../models/room');
var config     = require('../config/game');
var utilities  = require('../lib/utilities');

var Room     = mongoose.model('room', roomSchema);
var User     = mongoose.model('user', userSchema);

var onError = function(err){
  log(err);
};

module.exports = {

  create: function(req, res){
    var user = req.body;

    //Set default values
    //TODO GET X and Y
    _.extend(user, { alive: true, waiting: false, x: 50, y:50});

    var newUser = new User(user);
    newUser.save(onError);

    //Search for room available
    Room.findOne({$where: 'this.players.length < 4'}).exec(function(err, currentRoom){

      var numOfZombies = config.level1.zombiesPerPlayer;
      var room = currentRoom || new Room({
        players: [],
        zombies: [],
        level:   1
      });

      // Link user with room
      var data = { roomID: room.id };

      if(!currentRoom){
        data.player = 'ZombieController'; 
      }else{
        //Assign zombies per user to room

        var zombies = [];

        for(var i=0; i < numOfZombies; i++){
          zombies.push('zombie' + _.random(1,3));
        }

        _.each(zombies, function(zombie){
          _.extend(config[zombie], {_id: utilities.guid()});
          room.zombies.push(config[zombie]);
        });
      }

      User.findOneAndUpdate({_id: newUser.id}, data , function(err, userUpdated){
        room.players.push(_.pick(userUpdated, 'username', '_id', 'player', 'waiting', 'alive', 'x', 'y'));
        room.save(onError);
        res.send({user: userUpdated, room: room});
      });

    });
  },

  getRoom: function(req, res){
    var id = req.params.id;

    Room.findOne({id: id}).exec(function(err, room){
      res.send(room);
    });

  }
};
