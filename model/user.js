const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  accountNumber: String,
  balance: Number,
});

module.exports = mongoose.model('User', UserSchema);