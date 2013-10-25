$(function(){
  $('#loginForm').submit(function(event){
    event.preventDefault();
    var user = {
      username: $('#username').val(),
      player: $('input[type="radio"]').val()
    };

    if(user.username && user.player){
      $.ajax({
        method: 'POST',
        url: 'user/create',
        data: user
      }).done(function(user){
        localStorage.setItem('user', JSON.stringify(user));
        window.location.assign('/game');
      });
    }else{
      console.log('Please enter a username and pick a player');
    }
  });
});
