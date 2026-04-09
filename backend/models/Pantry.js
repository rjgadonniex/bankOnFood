const mongoose = require('mongoose');


const PantrySchema = mongoose.Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number,
  hours: String,
  phone: String, 
  email: String,
  website: String,

  pledges: [
    {
      id: Number,
      donor: String,
      item: String,
      quantity: Number,
      date: String,
    }
  ],

  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model('Pantry', PantrySchema);