ZombieWorld.components.socket = Crafty.c('Socket', {
  emit: function(name, data){
    ZombieWorld.socket.emit(name, data);
  }
});
