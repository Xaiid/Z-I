ZombieWorld.Controller.playerController = {

  init: function(){
    var myID = JSON.parse(localStorage.getItem('user'));
    // var getPlayerConf = $.ajax({type: 'GET', url: '/configuration?q'});
    console.log(myID);
  }

};
