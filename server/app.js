require("dotenv").config();

const express = require("express");
const app = express();
const router = express.Router();

const product_routes = require("./routes/products")
const users_routes = require("./routes/usersList")
const ngos_routes = require("./routes/ngoList")


const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World");
})

// middleware or set the routes
app.use("/api/products", product_routes);
app.use("/api/users", users_routes);
app.use("/api/ngos", ngos_routes);
app.use(express.json());

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () =>{
            console.log(`${PORT}, Yes I am connect`);
        })
    }
    catch(e){
        console.log(e);
    }
}

start()