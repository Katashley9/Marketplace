const express = require('express');
const router = express.Router();
const Product = require('./models/product'); // Assuming you have a Product model

// GET all products
router.get('/product', async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET product by id
router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw new Error('Product not found');
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// POST add new product
router.post('/product', async (req, res) => {
    const product = new Product(req.body);

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update product by id
router.put('/product/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) throw new Error('Product not found');
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// DELETE remove product by id
router.delete('/product/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) throw new Error('Product not found');
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// DELETE remove all products
router.delete('/product', async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: 'All products deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET find all products which name contains "kw"
router.get('/product/search/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const product = await Product.find({ name: { $regex: keyword, $options: 'i' } });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
