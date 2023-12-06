const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/usersList")

router.route("/").get(getAllUsers);

module.exports = router;