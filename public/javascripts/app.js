var ZombieWorld = {

  Level: '', //Keeps track of the current level
  map: {}, //Set the configuration for the current map
  LevelConfig: {},
  Controller:  {},
  Entities:    {},
  Components:  {},
  Players:     {},

  Sprites: {

    player1: Crafty.sprite(40, "/images/player_1.png", {
      player1: [0,0]
    }),

    // player2: Crafty.sprite(40, "/images/player_2.png", {
    //   player2: [0,0]
    // }),

    // player3: Crafty.sprite(40, "/images/player_3.png", {
    //   player3: [0,0]
    // }),

    // zombie1: Crafty.sprite(40, "/images/zombie_1.png", {
    //   zombie1: [0,0]
    // }),

    // zombie2: Crafty.sprite(40, "/images/zombie_2.png", {
    //   zombie2: [0,0]
    // }),

    // zombie3: Crafty.sprite(40, "/images/zombie_3.png", {
    //   zombie3: [0,0]
    // })

  },

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
