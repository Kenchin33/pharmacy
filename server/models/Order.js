const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    items: [
        {
            title: String,
            quantity: Number,
            price: Number,
            img: String
        }
    ],
    total: {type: Number, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);