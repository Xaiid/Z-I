$(function(){
  console.log("asd");

  $('#loginForm').submit(function(event){
    event.preventDefault();
    var user = {
      username: $('#username').val(),
      type: $('input[type="radio"]').val()
    };

    if(user.username && user.type){
      $.ajax({
        method: 'POST',
        url: 'users/create',
        data: user
      });
    }
  });
});
