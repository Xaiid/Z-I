ZombieWorld.Entities.free = Crafty.c('Free', {
  init: function(){
    this.addComponent('Element, Mouse')
    .bind('Click', function(e){
      console.log('Click:', e);
    });
  }
});
