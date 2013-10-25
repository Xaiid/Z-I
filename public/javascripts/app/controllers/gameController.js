ZombieWorld.Controller.gameController = {

  init: function(){
    ZombieWorld.Level = 1; //This should be substituted with the current player level
    var self = this;
    var mapConfiguration = $.ajax({type: 'GET', url: '/configuration?q=map'});

    mapConfiguration.done(function(map){
      ZombieWorld.map = map;

      var width  = map.width * map.tile.width;
      var height = map.height * map.tile.height;

      Crafty.init(width, height, 'game-are');

      var generateLevel = function(){
        self.buildLand(map);
      };

      Crafty.scene('Level1', generateLevel);
      Crafty.scene('Level2', generateLevel);
      Crafty.scene('Level3', generateLevel);

      Crafty.scene('Level'+ZombieWorld.Level);
    });

    mapConfiguration.fail(this.onError);
  },

  buildLand: function(map){
    var self = this;
    //This is substituted with the level background
    Crafty.background('rgb(30,100,100)');

    var gridConfiguration = $.ajax({type: 'GET', url: '/configuration?q=level'+ZombieWorld.Level});

    gridConfiguration.done(function(level){
      ZombieWorld.LevelConfig = level;

      //Create all the crafty entities
      self.createGrid(level.grid, function(){
        ZombieWorld.Controller.socketController.init();
        ZombieWorld.Controller.playerController.init();
      });
    });
  },

  createGrid: function(grid, cb){
    _.each(grid, function(x, xIndex){
      _.each(x, function(y, yIndex){

        var attrs = {
          x: xIndex * ZombieWorld.map.tile.width,
          y: yIndex * ZombieWorld.map.tile.height,
          w: ZombieWorld.map.tile.width,
          h: ZombieWorld.map.tile.height
        };

        switch(grid[xIndex][yIndex]){
          case 0:
            Crafty.e('Free').attr(attrs);
            break;
          case 1:
            Crafty.e('Obstacle').attr(attrs);
            break;
          case 2:
            break;
        }
      });
    });

    return cb();
  }
};
