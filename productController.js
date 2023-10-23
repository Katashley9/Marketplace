const Product = require('../models/Product');

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addProduct: async (req, res) => {
        const { name, description, price, quantity, categoryId } = req.body;

        try {
            const category = await Category.findById(categoryId);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const newProduct = new Product({
                name,
                description,
                price,
                quantity,
                category: category.name // Use the category name instead of the ID
            });

            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },



    updateProductById: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    removeProductById: async (req, res) => {
        try {
            const removedProduct = await Product.findByIdAndDelete(req.params.id);
            if (!removedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product removed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
