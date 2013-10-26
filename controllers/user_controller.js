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

      var room = currentRoom || new Room({
        players: [],
        zombies: [],
        level:   1
      });

      // Link user with room
      var data = { roomID: room.id };

      if(!currentRoom){ data.player = 'ZombieController'; }

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

  },

  updateRoom: function(req, res){
    var room = req.body;
    var numOfZombies = config.level1.zombiesPerPlayer;

    var zombies = [];

    _.each(room.players, function(){
      for(var i=0; i < numOfZombies; i++){
        zombies.push('zombie' + _.random(1,3));
      }
    });

    zombies = _.map(zombies, function(zombie, index){
      return _.extend(config[zombie], {
        _id: utilities.guid(),
        x:30 * index,
        y:100
      });
    });

    Room.findOneAndUpdate({_id: room._id}, {zombies: zombies}, function(err, updatedRoom){
      if(err){return res.send(400, err);}
      res.send('room updated');
    });

  }
};
