ZombieWorld.Entities.player = function(player){

  return Crafty.e('Player, ' + player.type)
      .attr({
        x: player.x,
        y: player.y
      })
      .requires('Keyboard')
      .animate("walk_left",  0, 1, 3)
      .animate("walk_right", 0, 2, 3)
      .animate("walk_up",    0, 3, 3)
      .animate("walk_down",  0, 0, 3)
      .fourway(player.player.speed)
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

};
