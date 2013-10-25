ZombieWorld.Controller.playerController = {

  init: function(){
    var user  = JSON.parse(localStorage.getItem('user'));
    user.type = user.player;

    var getPlayerConf = $.ajax({type: 'GET', url: '/configuration?q='+user.type});

    ZombieWorld.currentPlayer = user;

    getPlayerConf.done(this.setPlayer);
    getPlayerConf.error(ZombieWorld.onError);

  },

  setPlayer: function(player){
    ZombieWorld.currentPlayer.player = player;
    var myPlayer = ZombieWorld.currentPlayer;

    myPlayer.x = 50;
    myPlayer.y = 50;

    if(!myPlayer.ZombieController){
      ZombieWorld.currentPlayer.player.Entity = ZombieWorld.Entities.player(myPlayer);
    }
  }

};
