var mongoose   = require('mongoose');
var userSchema = require('../models/user');
var roomSchema = require('../models/room');

var Room     = mongoose.model('room', roomSchema);
var User     = mongoose.model('user', userSchema);

var onError = function(err){
  log(err);
};

module.exports = {

  create: function(req, res){
    var user = req.body;

    _.extend(user, {
      alive: true,
      waiting: false,
    });

    var newUser = new User(user);
    newUser.save(onError);

    //Search for room available

    Room.findOne({$where: 'this.players.length < 4'}).exec(function(err, room){

      if(!room){
        var newRoom = new Room({
          players: [newUser.id],
          zombies:[],
          level: 1
        });
        User.findOneAndUpdate({_id: newUser.id},{roomID: newRoom.id, player:'ZombieController'}, function(err, userUpdated){
          res.send(userUpdated);
        });
      }

      if(room){
        room.players.push(newUser.id);
        room.save(onError);
        User.findOneAndUpdate({_id: newUser.id},{roomID: room.id}, function(err, userUpdated){
          res.send(userUpdated);
        });
      }

    });
  }
};
