const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  pantryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pantry', 
    required: true 
  },
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Produce', 'Non-Perishables', 'Dry Goods', 'Canned Protein', 'Hygiene'],
    required: true 
  },
  stockLevel: { type: Number, default: 0 },
  wishlisted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);