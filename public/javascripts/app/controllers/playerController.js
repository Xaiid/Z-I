ZombieWorld.Controller.playerController = {

  init: function(){
    var user          = JSON.parse(localStorage.getItem('user'));
    ZombieWorld.room  = JSON.parse(localStorage.getItem('room'));
    user.type = user.player;


    var getPlayerConf = $.ajax({type: 'GET', url: '/configuration?q='+user.type});

    ZombieWorld.currentPlayer = user;

    ZombieWorld.socket.emit('new player', {user: user._id, room: ZombieWorld.room._id});
    ZombieWorld.socket.emit('create zombies', {room: ZombieWorld.room._id});

    getPlayerConf.done(this.setPlayer);
    getPlayerConf.error(ZombieWorld.onError);

    this.loadTeam();

  },

  setPlayer: function(player){
    ZombieWorld.currentPlayer.player = player;
    var myPlayer = ZombieWorld.currentPlayer;

    if(!player.ZombieController){
      var Entity = ZombieWorld.Entities.player(myPlayer);

      Entity.fourway(player.speed)
      .bind('NewDirection', function(data) {
        this.stop();
        if (data.x > 0) {
          this.animate('walk_right', 20, -1);
        } else if (data.x < 0) {
          this.animate('walk_left',  20, -1);
        } else if (data.y > 0) {
          this.animate('walk_down',  20, -1);
        } else if (data.y < 0) {
          this.animate('walk_up',    20, -1);
        } else {
          this.stop();
        }
      })
      .bind("EnterFrame", function(e) {
        if(this.isDown("LEFT_ARROW")) {
          this.emit('Move player', { to: "LEFT_ARROW",  player: myPlayer._id});
        } else if(this.isDown("RIGHT_ARROW")) {
          this.emit('Move player', { to: "RIGHT_ARROW", player: myPlayer._id});
        } else if(this.isDown("UP_ARROW")) {
          this.emit('Move player', { to: "UP_ARROW",    player: myPlayer._id});
        } else if(this.isDown("DOWN_ARROW")) {
          this.emit('Move player', { to: "DOWN_ARROW",  player: myPlayer._id});
        }

      });
      

      ZombieWorld.currentPlayer.player.Entity = Entity;
        
    }
  },

  loadTeam: function(){
    _.each(ZombieWorld.room.players, function(player){
      if(!ZombieWorld.Players[player._id] && player.player !== 'ZombieController'){
        if(player._id !== ZombieWorld.currentPlayer._id){
          player.type = player.player;
          player.Entity = ZombieWorld.Entities.player(player);
          ZombieWorld.Players[player._id] = player;
        }
      }
    });
  }

};
