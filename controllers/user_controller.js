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

    //Set default values
    _.extend(user, { alive: true, waiting: false, });

    var newUser = new User(user);
    newUser.save(onError);

    //Search for room available
    Room.findOne({$where: 'this.players.length < 4'}).exec(function(err, currentRoom){

      var room = currentRoom || new Room({
        players: [],
        zombies: [],
        level:   1
      });

      room.players.push(_.pick(newUser, 'username', '_id', 'player', 'waiting', 'alive'));
      room.save(onError);

      // Link user with room
      var data = { roomID: room.id };

      if(!currentRoom){ data.player = 'ZombieController'; }

      User.findOneAndUpdate({_id: newUser.id}, data , function(err, userUpdated){
        res.send({user: userUpdated, room: room});
      });

    });
  }
};
