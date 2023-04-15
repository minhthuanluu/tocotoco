const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Order } = require('../models/order');
const moment = require("moment")
// Order product
router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.body.user.email });
    if (!user) {

    } else {
        let newOrder = new Order({
            uid: user._id,
            email: user.email,
            user,
            product: req.body.product
        });

        newOrder = await newOrder.save();
        if (!newOrder) {
            res.status(409).json({ success: false, message: '500 Internal Server Error' })
        }
        res.send(newOrder);
    };

});

// get Order list by uid
router.get('/', async (req, res) => {
    const product = await Order.find({ uid: req.body.uid });
    if (!product) {
        res.status(404).json({ success: false, message: 'Your order list not found' })
    }
    res.send(product);
});


router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;

    const product = await Order.findById(id);
    if (product) {
        try {
            let timeLeft = moment() - product.orderDate;
            if (timeLeft >= 30) {
                res.status(200).send({ success: true, message: "Product was delete successfully from your bill" })
            } else {
                await Order.findByIdAndRemove(id);
                res.status(406).send({ success: true, message: "Time up to remove your bill! Please make it within 30 minutes of placing your order!" })
            }

        } catch (error) {
            res.status(406).send({ success: true, message: error })
        }

    } else {
        res.status(404).send({ success: true, message: "Product was not found from your bill" })
    }

})


module.exports = router;