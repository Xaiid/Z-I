var ZombieWorld = {

  Level: '', //Keeps track of the current level
  map: {}, //Set the configuration for the current map
  LevelConfig: {},
  Controller: {},
  Entities: {},
  Components: {},

  onError: function(error){
    alert(error);
  }

};

$(function(){
  var game = $('#game').val();

  if(game === 'ready'){
    ZombieWorld.Controller.gameController.init();
  }

});
