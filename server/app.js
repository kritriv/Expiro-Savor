require("dotenv").config();
const express = require("express");
const app = express();

const product_routes = require("./routes/products")
const users_routes = require("./routes/usersList")
const ngos_routes = require("./routes/ngoList")
const ApiAuthenticate = require("./middleware/basic-auth")


const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Expiro Savor Server");
})

// middleware or set the routes

// app.use('/api', ApiAuthenticate);
app.use("/api", product_routes);  // middleware routes for Products
app.use("/api", users_routes);   // middleware routes for Users
app.use("/api", ngos_routes);    // middleware routes for NGos
app.use(express.json());

const ExpiroSavorAPP = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () =>{
            console.log(`Server is Listening on PORT: ${PORT}`);
        })
    }
    catch(e){
        console.log(e);
    }
}

ExpiroSavorAPP()