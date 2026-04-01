const mongoose = require('mongoose');

const DonationPledgeSchema = mongoose.Schema({
    donator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    unit: {
        type: String,
        enum: ['lbs', 'cans', 'boxes', 'bags', 'units'],
        default: 'units'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'received'],
        default: 'pending'
    },
    datePledged: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DonationPledge', DonationPledgeSchema);