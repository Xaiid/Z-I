ZombieWorld.Controller.playerController = {

  init: function(){
    var user = JSON.parse(localStorage.getItem('user'));
    var getPlayerConf = $.ajax({type: 'GET', url: '/configuration?q='+user.player});

    ZombieWorld.currentPlayer = user;

    getPlayerConf.done(this.setPlayer);
    getPlayerConf.error(ZombieWorld.onError);

  },

  setPlayer: function(player){
    ZombieWorld.currentPlayer.player = player;
  }

};
