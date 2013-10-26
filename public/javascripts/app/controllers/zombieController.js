ZombieWorld.Controller.zombieController = {

  init: function(){
    var zombies  = JSON.parse(localStorage.getItem('room')).zombies;
    _.each(zombies, function(zombie){
      ZombieWorld.Zombies[zombie._id] = ZombieWorld.Entities.zombie(zombie);
    });
  },

  move: function(opts){
    var   Zombie  = ZombieWorld.Zombies[opts.zombieID];
    destiny = opts.destiny;

    if(!Zombie){return false;}

    zombie = Zombie.Entity;

    if(!zombie.moving){
      var start  = {
        x: zombie.x,
        y: zombie.y
      }

      var remove = function(pos, animation, cb){
        if(zombie[pos] <= destiny[pos]){ return cb(); }

        var move = function(){
          setTimeout(function(){
            zombie.animate(animation, 50, 1);
            start[pos] -= 1;
            zombie[pos] = start[pos];
            if(zombie[pos] > destiny[pos]){
              move();
            }else{return cb()}
          }, 30);
        }
        move();
      };

      var add = function(pos, animation, cb){
        if(zombie[pos] >= destiny[pos]){ return cb(); }

        var move = function(){
          setTimeout(function(){
            zombie.animate(animation, 50, 1);
            start[pos] += 1;
            zombie[pos] = start[pos];

            if(zombie[pos] < destiny[pos]){
              move();
            }else{return cb()}
          }, 30);
        }
        move();
      };

      var count = 0;
      var ready = function(){
        count += 1;

        if(count === 4){
          zombie.moving = false;
          zombie.stop();
        }
      };

      remove('x', 'walk_left', ready);
      add('x', 'walk_right', ready);

      remove('y','walk_up', ready);
      add('y', 'walk_down', ready);
    }
  }
};
