const express = require("express");
const router = express.Router();
const { getAllNgos,postSingleNgo, getSingleNgo, deleteSingleNgo, updateSingleNgo} = require("../controllers/ngoList")

// To get All Ngos list
router.route("/ngos").get(getAllNgos);

// To Add a Ngo to Ngos list
router.route("/ngos/add-Ngo").post(postSingleNgo);

// To get Single Ngo Details
router.route("/ngos/:id").get(getSingleNgo);

// To Delete Single Ngo Details
router.route("/ngos/:id").delete(deleteSingleNgo);

// To Update a Single Ngo Details
router.route("/ngos/:id").put(updateSingleNgo);

// To Patch a Single Ngo Details
router.route("/ngos/:id").patch(updateSingleNgo);


module.exports = router;