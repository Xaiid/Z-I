ZombieWorld.Controller.gameController = {

  onError: function(error){
    alert(error);
  },

  init: function(){
    var mapConfiguration = $.ajax({type: 'GET', url: '/configuration?q=map'});
    mapConfiguration.done(this.buildLand);
    mapConfiguration.fail(this.onError);
  },

  buildLand: function(map){

    var width  = map.width * map.tile.width;
    var height = map.height * map.tile.height;

    Crafty.init(width, height, 'game-are');
    Crafty.background('rgb(34,168,59)');

    ZombieWorld.Controller.socketController.init();

  }

};
