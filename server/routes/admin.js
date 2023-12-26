const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/auth');


router.get("/protected",authMiddleware(["admin"]) ,async (req, res)=>{
    return response.send("protected")
})


module.exports = router;