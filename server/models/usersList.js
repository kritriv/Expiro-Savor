// Assuming you're using Mongoose for the model schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the user
const userSchema = new Schema({
    userProfileUrl: {
        type: String,
        // required: true
    },
    name:
    {
        firstName: {
            type: String,
            // required: true
        },
        lastName: {
            type: String,
            // required: true
        }
    },
    username: {
        type: String,
        // required: true
    },
    userid: {
        type: Number,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        validate: {
            validator: function (v) {
                // Basic email format check using a regular expression
                return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    mobileNo: {
        type: Number,
        // required: true
    },
    Subscribed: {
        type: Boolean,
        default: true
    },
    address:
    {
        street: String,
        City: String,
        State: String,
        pincode: Number,
        country: String,
        latitude: String,
        longitude: String
    },
    password: {
        type: String,
        // required: true
    }
});

// Create the model for the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;