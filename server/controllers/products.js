const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    // try {
    const { category, productId, title, isExpireIn24, ishugestock, is_donatable, city, state, pincode, country, sort, select } = req.query;
    const queryObject = {};

    // ======= Filters Queries =======

    if (category) {
        queryObject.category = { $regex: new RegExp(category, 'i') };
    }
    if (productId) {
        queryObject.productId = productId;
    }
    if (title) {
        queryObject.title = { $regex: new RegExp(title, 'i') };
    }
    if (isExpireIn24 !== undefined) {
        queryObject.isExpireIn24 = (isExpireIn24.toLowerCase() === 'true');
    }
    if (ishugestock !== undefined) {
        queryObject.ishugestock = (ishugestock.toLowerCase() === 'true');
    }
    if (is_donatable !== undefined) {
        queryObject.is_donatable = (is_donatable.toLowerCase() === 'true');
    }

    if (city) {
        queryObject['productLocation.City'] = { $regex: new RegExp(city, 'i') };
    }
    if (state) {
        queryObject['productLocation.State'] = { $regex: new RegExp(state, 'i') };
    }
    if (pincode) {
        queryObject['productLocation.pincode'] = pincode;
    }
    if (country) {
        queryObject['productLocation.country'] = { $regex: new RegExp(country, 'i') };
    }


    let apiData = Product.find(queryObject);
    // ======== Short , Select ======


    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }
    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    // ===== Pagination and limits ====

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 20;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const Products = await apiData;
    res.status(200).json({ Products, nbHits: Products.length });


    // } catch (error) {
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
}


const getAllProductsTesting = async (req, res) => {
    const Products = await Product.find(req.query).sort("name");
    res.status(200).json({ Products });
}
const addProduct = async (req, res) => {
    try {
        let product = new Product(req.body);
        let result = await product.save();
        res.send(result);

        // if (!req.body) {
        //     return res.status(400).json({ error: 'Request body is empty' });
        // }

        // const {
        //     productId,
        //     product_img_url,
        //     title,
        //     category,
        //     price,
        //     ishugestock,
        //     stock,
        //     description,
        //     expiry_date,
        //     isExpireIn24,
        //     is_donatable,
        //     productLocation,
        //     expiryStatus,
        //     productStatus,
        //     userid,
        // } = req.body;

        // const newProduct = new Product({
        //     productId,
        //     product_img_url,
        //     title,
        //     category,
        //     price,
        //     ishugestock,
        //     stock,
        //     description,
        //     expiry_date,
        //     isExpireIn24,
        //     is_donatable,
        //     productLocation,
        //     expiryStatus,
        //     productStatus,
        //     userid,
        // });

        // Save the new product to the database
        // await newProduct.save();

        // res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = { getAllProducts, getAllProductsTesting, addProduct };