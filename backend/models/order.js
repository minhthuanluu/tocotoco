const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    uid:{
        type: String,
        default:{}
    },
    email:{
        type: String,
        default:{}
    },
    user: {
        type: Object,
        default:{}
    },
    product: {
        type:Array,
        default:[]
    },
    orderDate: {
        type: Date,
        default: Date.now()
    }
})

exports.Order = mongoose.model('Orders', ordersSchema);
