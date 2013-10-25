ZombieWorld.Controller.socketController = {

  events: { 
    'new player': 'newPlayer'
  },

  init: function(){
    ZombieWorld.socket = io.connect();
    var self = this;
    _.each(this.events, function(method, key){
      if(typeof self[method] === 'function'){
        ZombieWorld.socket.on(key, _.bind(self[method], self));
      }
    });
  },

  newPlayer: function(playerID){
    $.ajax({type: 'GET', url: 'room?id='+ZombieWorld.room._id}).done(function(room){

      ZombieWorld.room = room;

      var newPlayer = _.find(room.players, function(player){
        return player._id === playerID;
      });

      if(!ZombieWorld.Players[playerID] && newPlayer.player !== 'ZombieController'){
        console.log(newPlayer);
        newPlayer.type = newPlayer.player;
        newPlayer.Entity = ZombieWorld.Entities.player(newPlayer);
        ZombieWorld.Players[playerID] = newPlayer;
      }

    });
  }

};
