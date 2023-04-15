const mongoose = require('mongoose');

const toppingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

toppingSchema.set('toJSON', {
    virtuals: true
});

exports.Topping = mongoose.model('Topping', toppingSchema);