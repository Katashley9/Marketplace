const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    } // Reference to Category model
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
