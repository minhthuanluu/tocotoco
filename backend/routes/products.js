const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

// get product by category id
router.get(`/categoryId=:cateId`, async (req, res) => {
    const {cateId} = req.params;
    const productList = await Product.find({category:cateId}).populate("category");
    
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});

//get product by id
router.get(`/:id`, async (req, res) => {
    const {id} = req.params;
    const productList = await Product.findById(id);
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});

module.exports = router;