const { Cart } = require('../models/cart');
const express = require('express');
const { Product } = require('../models/product');
const { User } = require('../models/user');
const router = express.Router();

// get cart list
router.get(`/:uid`, async (req, res) => {
    const { uid } = req.params;
    const cartList = await Cart.find({ user: uid }).populate('user');
    if (!cartList) {
        res.status(404).json({ success: false, message: "You cart is empty" });
    }
    res.send(cartList);
});

// add new cart
router.post('/:uid', async (req, res) => {

    // const idArray = req.body;
    // const newArray = [];
    // for (let i = 0; i < idArray.length; i++) {
    //     const id = idArray[i].id;
    //     const product = await Product.findById(id);
    //     newArray.push(product)
    // }

    // const params = {

    // }
    // const product = await Product.findById(id);
    const { uid } = req.params;
    const user = await User.findById(uid);
    if (!user) {
        res.status(404).json({ success: false, message: "This user was not found!" });
    }

    const productArray = req.body;

    let newCart = new Cart({
        user,
        product: productArray
    });

    newCart = await newCart.save();
    if (!newCart) {
        res.status(500).json({ success: false, message: t('serverIsError', lang) })

    }
    res.status(200).send(newCart);
});

// remove one cart
router.delete('/:uid', async (req, res) => {
    const { id } = req.body;

    await Cart.findByIdAndRemove(id);
    res.send({ success: true, message: "Product was delete successfully" })
});

// remove all cart by user id
router.delete('/remove-all/:uid', async (req, res) => {
    const { id } = req.body;
    const { uid } = req.params;

    await Cart.remove({ user: uid, _id: id });
    res.send({ success: true, message: "All item in cart was delete successfully" })
});

module.exports = router;