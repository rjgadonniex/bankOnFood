const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  manager: {
    type: String,
    required: true,
    unqiue: true
  },

  description: {
    type: String
  }
});

module.exports = mongoose.model('Category', CategorySchema);