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
        enum: ["IN STOCK", "RUNNING LOW", "CRITICAL"]
    },
    pantryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pantry",
        required: true
    },

    category: {
        type: String,
        enum: ['Produce', 'Meat & Seafood', 'Dairy & Refrigerated', 'Bakery', 'Frozen Foods', 
            'Non-Perishables', 'Dry Goods', 'Beverages', 'Miscellaneous'],
        default: 'Miscellaneous'
    },

    wishlist: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);