var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  return new Schema({
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
  });
}
