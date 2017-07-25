var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  nickname: String, // primary key
}, {versionKey: false});

var roomSchema = new Schema({
  title: String,
  maker: String,
  open: Boolean,
  maxUser: Number,
  currentUser: Number,
  userList: Array,
  gameCardList: Array,
  player0CardList: Array,
  player1CardList: Array,
  player2CardList: Array,
  player3CardList: Array,
  turn: Number,
  rule: String,
  currentAlive: Array,
}, {versionKey: false})

module.exports = {
  User: mongoose.model('user', userSchema),
  Room: mongoose.model('room', roomSchema),
}

