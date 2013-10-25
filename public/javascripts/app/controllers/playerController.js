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
      ZombieWorld.currentPlayer.player.Entity = ZombieWorld.Entities.player(myPlayer);
    }
  }

};
