`use strict`;

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: String,
    price: String,
    onSale: Boolean
});

const Product = model('Product', productSchema);

mongoose.connect(`mongodb://localhost:27017/tesco`, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`connected`);
    }
});

module.exports = { "Product": Product };