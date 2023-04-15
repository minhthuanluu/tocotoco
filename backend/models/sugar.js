const mongoose = require('mongoose');

const sugarSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

sugarSchema.set('toJSON', {
    virtuals: true
});

exports.Sugar = mongoose.model('Sugar', sugarSchema);