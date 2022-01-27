const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    gifts: [{
        type: Schema.Types.ObjectId,
        ref: 'Gift'
    }]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;