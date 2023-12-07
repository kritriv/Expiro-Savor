const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the product
const productSchema = new Schema({
    productId: {
        type: Number,
        // required: true
    },
    product_img_url: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        enum: ['Food', 'Medicine', 'Other'],
    },
    price: {
        type: Number,
        // required: true
    },
    ishugestock: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    expiry_date: {
        type: Date,
        // required: true
    },
    isExpireIn24: {
        type: Boolean,
        default: false
    },
    is_donatable: {
        type: Boolean,
        default: false
    },
    productLocation: [
        {
            street: String,
            City: String,
            State: String,
            pincode: Number,
            country: String,
            latitude: String,
            longitude: String
        }
    ],
    expiryStatus: {
        type: Boolean,
        default: false
    },
    productStatus: {
        type: Boolean,
        default: true
    },
    userid: {
        type: Number,
        // required: true
    }
});

// Create the model for the product schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
