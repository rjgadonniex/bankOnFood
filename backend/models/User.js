const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'donator', 'manager'],
    required: true,
    default: 'user'
  }
});

module.exports = mongoose.model('User', UserSchema);