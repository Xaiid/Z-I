var ZombieWorld = {

  Controller: {},
  init: function(){ }

};

$(function(){
  var game = $('#game').val();

  if(game === 'ready'){
    ZombieWorld.Controller.gameController.init();
  }

});
