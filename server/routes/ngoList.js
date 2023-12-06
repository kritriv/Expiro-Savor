const express = require("express");
const router = express.Router();
const { getNGOList } = require("../controllers/ngoList")

router.route("/").get(getNGOList);

module.exports = router;