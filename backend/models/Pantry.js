const mongoose = require('mongoose');

const PantrySchema = mongoose.Schema({
  name: String,
  location: String,
  phoneNumber: String,
  email: String,
  website: String,

  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model('Pantry', PantrySchema);