module.exports = function(socket){
  console.log('Someone just connected');

  socket.on('Move player', function(data){
    socket.broadcast.to(data.room).emit('Move player', data);
  });

  socket.on('new player', function(data){
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('new player', data.user);
  });

};
