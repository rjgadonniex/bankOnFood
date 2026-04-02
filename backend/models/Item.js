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
        enum: ["critical", "low", "full"]
    },
    pantryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pantry",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
});

module.exports = mongoose.model('Item', ItemSchema);