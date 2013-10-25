var mongoose = require('mongoose');

module.exports = mongoose.Schema({
  username: {type: String, required: true},
  roomID: String,
  alive: Boolean,
  waiting: Boolean,
  player: {
    name: String,
    speed: Number,
    gun: {
      name: String,
      damage: Number,
      speed: Number,
      frequency: Number,
      distance: Number,
    },
  }
})
