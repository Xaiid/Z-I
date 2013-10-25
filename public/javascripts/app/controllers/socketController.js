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
    if(!ZombieWorld.Players[playerID]){
      console.log(playerID, ZombieWorld.room);
    }
  }

};
