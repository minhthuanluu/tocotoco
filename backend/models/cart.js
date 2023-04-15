const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: Array,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

exports.Cart = mongoose.model('Carts', cartSchema);
