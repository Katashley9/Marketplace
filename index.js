const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const productController = require('./controllers/productController');



mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// Middleware

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Marketplace application!');
});

app.get('/product', productController.getAllProducts);
app.get('/product/:id', productController.getProductById);
app.post('/product', productController.addProduct);
app.put('/product/:id', productController.updateProductById);
app.delete('/product/:id', productController.removeProductById);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


require('dotenv').config();



