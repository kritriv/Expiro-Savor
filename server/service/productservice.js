const Product = require('../models/product');
const { ObjectId } = require('mongodb');

const ViewProduct = async ({ category, title, isExpireIn24, ishugestock, is_donatable, productStatus, expiryStatus, city, state, pincode, country, sort, select, page = 1, limit = 5 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======
        if (title) {
            queryObject.title = { $regex: new RegExp(title, 'i') };
        }
        if (category) {
            queryObject.category = { $regex: new RegExp(category, 'i') };
        }
        if (isExpireIn24 !== undefined) {
            queryObject.isExpireIn24 = isExpireIn24.toLowerCase() === 'true';
        }
        if (ishugestock !== undefined) {
            queryObject.ishugestock = ishugestock.toLowerCase() === 'true';
        }
        if (is_donatable !== undefined) {
            queryObject.is_donatable = is_donatable.toLowerCase() === 'true';
        }
        if (productStatus !== undefined) {
            queryObject.productStatus = productStatus.toLowerCase() === 'true';
        }
        if (expiryStatus !== undefined) {
            queryObject.expiryStatus = expiryStatus.toLowerCase() === 'true';
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
            queryObject['productLocation.country'] = {
                $regex: new RegExp(country, 'i'),
            };
        }

        // ======== Short , Select ======

        let apiData = Product.find(queryObject);

        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const Products = await apiData;
        return Products;
    } catch (error) {
        throw new Error('An error occurred while fetching products: ' + error.message);
    }
};

const AddProduct = async (data) => {
    try {
        const result = await Product(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding product: ${error.message}`);
    }
};

const SingleProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Product.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single product: ${error.message}`);
    }
};

const DeleteProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Product.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting product: ${error.message}`);
    }
};

const UpdateProduct = async (id, updateProductData) => {
    try {
        const filter = { _id: id };
        const result = await Product.findByIdAndUpdate(filter, updateProductData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating product: ${error.message}`);
    }
};

module.exports = {
    ViewProduct,
    AddProduct,
    SingleProduct,
    DeleteProduct,
    UpdateProduct,
};
