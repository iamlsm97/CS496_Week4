var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  nickname: String, // primary key
  userCardList: Array
}, {versionKey: false});

var roomSchema = new Schema({
  title: String,
  maker: String,
  open: Boolean,
  maxUser: Number,
  currentUser: Number,
  userList: Array,
  gameCardList: Array,
}, {versionKey: false})

module.exports = {
  User: mongoose.model('user', userSchema),
  Room: mongoose.model('room', roomSchema),
}

