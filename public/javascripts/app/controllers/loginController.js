$(function(){
  $('#loginForm').submit(function(event){
    event.preventDefault();
    var user = {
      username: $('#username').val(),
      type: $('input[type="radio"]').val()
    };

    if(user.username && user.type){
      $.ajax({
        method: 'POST',
        url: 'user/create',
        data: user
      }).done(function(user){
        localStorage.setItem('user', user._id || user.id);
        window.location.assign('/game');
      });
    }else{
      console.log('Please enter a username and pick a player');
    }
  });
});
