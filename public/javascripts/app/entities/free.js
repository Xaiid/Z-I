ZombieWorld.Entities.free = Crafty.c('Free', {
  init: function(){
    this.addComponent('Element, Mouse')
    .bind('Click', function(e){
      //not sure about this
      if(ZombieWorld.currentZombie && ZombieWorld.currentPlayer.type === 'ZombieController'){
        var opts = {
          destiny: {
            x: this.x,
            y: this.y,
          },
          zombieID: ZombieWorld.currentZombie._id,
          room: ZombieWorld.room._id
        }

        ZombieWorld.Controller.zombieController.move(opts);
        ZombieWorld.socket.emit('move zombie', opts);
        //zombie.shouldMove = true;

      room  = JSON.parse(localStorage.getItem('room'));

      var zombies = _.map(room.Zombies, function(zombie){
        if(zombie._id === opts.zombieID){
          zombie.x = this.x;
          zombie.y = this.y;
        }
        return zombie;
      });

      console.log('zombies', zombies);

      var data = { roomID: ZombieWorld.room._id, zombies: zombies};

      $.ajax({type: 'PUT', url: 'room', data: data});

      }
    });
  }
});
