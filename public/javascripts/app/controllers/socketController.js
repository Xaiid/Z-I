ZombieWorld.Controller.socketController = {

  events: { 
    'new player': 'newPlayer',
    'Move player': 'move'
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
      localStorage.setItem('room', JSON.stringify(room));

      var newPlayer = _.find(room.players, function(player){
        return player._id === playerID;
      });

      if(!ZombieWorld.Players[playerID] && newPlayer.player !== 'ZombieController'){
        newPlayer.type = newPlayer.player;
        newPlayer.Entity = ZombieWorld.Entities.player(newPlayer);
        ZombieWorld.Players[playerID] = newPlayer;
      }

    });
  },

  move: function(data){
    var player = ZombieWorld.Players[data.player];
    if(player){
      switch(data.to){

        case 'LEFT_ARROW':
          player.Entity.x-=player.Entity._speed;
        break;

        case 'RIGHT_ARROW':
          player.Entity.x+=player.Entity._speed;
        break;

        case 'UP_ARROW':
          player.Entity.y-=player.Entity._speed;
        break;

        case 'DOWN_ARROW':
          player.Entity.y+=player.Entity._speed;
        break;

      }
    }
  }

};
