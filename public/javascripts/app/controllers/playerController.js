ZombieWorld.Controller.playerController = {

  init: function(){
    var user          = JSON.parse(localStorage.getItem('user'));
    ZombieWorld.room  = JSON.parse(localStorage.getItem('room'));
    user.type = user.player;

    var getPlayerConf = $.ajax({type: 'GET', url: '/configuration?q='+user.type});

    ZombieWorld.currentPlayer = user;
    ZombieWorld.socket.emit('new player', {user: user._id, room: ZombieWorld.room._id});

    getPlayerConf.done(this.setPlayer);
    getPlayerConf.error(ZombieWorld.onError);

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
      });

      ZombieWorld.currentPlayer.player.Entity = Entity;
        
    }
  }

};
