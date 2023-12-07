const express = require("express");
const router = express.Router();
const { getAllProducts, getAllProductsTesting } = require("../controllers/products");
const productController = require('../controllers/products');

router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);



router.post('/add', productController.addProduct);

module.exports = router;