const mongoose = require('mongoose');

const iceSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

exports.Ice = mongoose.model('Ice', iceSchema);
