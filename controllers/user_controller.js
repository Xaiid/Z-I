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
    var numOfZombies = config.level1.zombiesPerPlayer;
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

      if(!currentRoom){ 
        data.player = 'ZombieController'; 
      }else{
        //Assign zombies per user to room

        for(var i=0; i < numOfZombies; i++){

          //Create  random zombie
          var zombie = _.extend(config['zombie' + _.random(1,3)], {
            _id: utilities.guid(),
            x:30 * i,
            y:100
          });

          //Add random zombie
          room.zombies.push(zombie);
        }
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

  },

  updateRoom: function(req, res){
    var roomID  = req.body.roomID;
    var zombies = req.body.zombies;

    Room.findOne({_id: roomID}, function(err, room){
      if(err){ return res.send(400, err); }
      if(!room){return res.send(400, 'room not found');}

      //Get new zombies created, just in case...
      var newZombies = _.reject(room.zombies, function(zombie){
        return _.findWhere(zombies, {_id: zombie._id});
      });

      room.zombies = _.uniq(newZombies, zombies);
      room.save(onError);
      res.send('updated zombies n.n');
    });
  }
};
