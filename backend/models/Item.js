const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name: String,
    quantity: Number,
    unit: {
        type: String,
        enum: ['lbs', 'cans', 'boxes', 'bags', 'units'],
        default: 'units'
    },
    status: {
        type: String,
        enum: ["IN STOCK", "RINNING LOW", "CRITICAL"]
    },
    pantryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pantry",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    wishlist: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);