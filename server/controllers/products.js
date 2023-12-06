const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    // try {
        const { category, isExpireIn24,ishugestock, city, state, pincode, country, sort, select } = req.query;
        const queryObject = {};

        // ======= Filters Queries =======

        if (category) {
            queryObject.category = { $regex: new RegExp(category, 'i') };
        }

        if (isExpireIn24 !== undefined) {
            queryObject.isExpireIn24 = (isExpireIn24.toLowerCase() === 'true');
        }
        if (ishugestock !== undefined) {
            queryObject.ishugestock = (ishugestock.toLowerCase() === 'true');
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

module.exports = { getAllProducts, getAllProductsTesting };