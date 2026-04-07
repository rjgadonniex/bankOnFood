const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  
  pantryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pantry",
        required: true,
        unique: true
    },

  description: {
    type: String
  }
});

module.exports = mongoose.model('Category', CategorySchema);