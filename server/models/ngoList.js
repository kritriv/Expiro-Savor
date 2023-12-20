// Assuming you're using Mongoose for the model schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the NGO
const ngoSchema = new Schema({
    ngoProfileUrl: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        validate: {
            validator: function (v) {
                // Basic email format check using a regular expression
                return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    mobileNo: {
        type: String,
        required: true
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
    onGoogleMap: {
        type: Boolean,
        default: true
    }
},{timestamps:true});

// Create the model for the NGO schema
const NGO = mongoose.model('NGO', ngoSchema);

module.exports = NGO;
