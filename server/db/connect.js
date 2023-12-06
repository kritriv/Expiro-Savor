const mongoose = require("mongoose");

const uri    = "mongodb+srv://vishh:vishh%40ME22@vishh.ucrbuqt.mongodb.net/vishh?retryWrites=true&w=majority";

const connectDB =() => {
    console.log("its works");
    return mongoose.connect(uri);
}

module.exports = connectDB;