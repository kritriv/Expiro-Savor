require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const UsersList = require("./models/usersList");
const NgoList = require("./models/ngoList");

const ProductJson = require("./product.json");
const UsersListJson = require("./usersList.json");
const ngoListJson = require("./ngoList.json");

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await UsersList.deleteMany();
        await NgoList.deleteMany();

        await Product.create(ProductJson);
        console.log("Products Successfully Inserted");
        
        await UsersList.create(UsersListJson);
        console.log("Users Successfully Inserted");
        
        await NgoList.create(ngoListJson);
        console.log("Ngo list Successfully Inserted");
    }
    catch(error){
        console.log(error);
    }
}

start();