ZombieWorld.Controller.socketController = {

  events: { 
    'new player': 'newPlayer',
    'Move player': 'move',
    'update zombies': 'updateZombies',
    'build zombies': 'buildZombies',
    'move zombie': 'moveZombie'
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

  updateZombies: function(){
    if(ZombieWorld.currentPlayer.type === 'ZombieController'){
      var data = { roomID: ZombieWorld.room._id, zombies: ZombieWorld.zombies};
      $.ajax({type: 'PUT', url: 'room', data: data}).done(function(room){
        ZombieWorld.socket.emit('zombies ready', {room: room._id});
      });
    }
  },

  buildZombies: function(room){
    $.ajax({type: 'GET', url: 'room?id='+ZombieWorld.room._id}).done(function(room){
      _.each(room.zombies, function(zombie){
        if(!ZombieWorld.Zombies[zombie._id]){
          var Entity = ZombieWorld.Entities.zombie(zombie);
          var currentZombie;

          if(ZombieWorld.currentPlayer.type === 'ZombieController'){
            Entity.bind('Click', function(){
              currentZombie = _.findWhere(ZombieWorld.Zombies, {Entity: this});
              ZombieWorld.currentZombie = currentZombie;
            });
          }
            ZombieWorld.Zombies[zombie._id] = {Entity: Entity, _id: zombie._id};
        }
      });
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
          player.Entity.x = data.x;

          if(!player.Entity.isPlaying("walk_left")){
            player.Entity.stop().animate("walk_left", 20, 1);
          }
        
        break;

        case 'RIGHT_ARROW':
          player.Entity.x = data.x;

          if(!player.Entity.isPlaying("walk_right")){
            player.Entity.stop().animate("walk_right", 20, 1);
          }

        break;

        case 'UP_ARROW':
          player.Entity.y = data.y;

          if(!player.Entity.isPlaying("walk_up")){
            player.Entity.stop().animate("walk_up", 20, 1);
          }

        break;

        case 'DOWN_ARROW':
          player.Entity.y = data.y;

          if(!player.Entity.isPlaying("walk_down")){
            player.Entity.stop().animate("walk_down", 20, 1);
          }

        break;

      }

    }
  },
  
  moveZombie: function(data){
    ZombieWorld.Controller.zombieController.move(data);
  }

};
