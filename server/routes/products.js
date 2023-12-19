const express = require("express");
const router = express.Router();
const { getAllProducts,postSingleProduct, getSingleProduct, deleteSingleProducts, updateSingleProducts} = require("../controllers/products");

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Products list
router.route("/products").get(getAllProducts);

// To Add a Product to Products list
router.route("/products/add-product").post(postSingleProduct);

// To get Single Product Details
router.route("/products/:id").get(getSingleProduct);

// To Delete Single Product Details
router.route("/products/:id").delete(deleteSingleProducts);

// To Update a Single Product Details
router.route("/products/:id").put(updateSingleProducts);

// To Patch a Single Product Details
router.route("/products/:id").patch(updateSingleProducts);


module.exports = router;