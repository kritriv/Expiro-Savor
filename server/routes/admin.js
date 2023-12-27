const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/auth');


router.get("/protected",authMiddleware(["admin"]) ,async (req, res)=>{
    return res.send("This is admin routes")
})

// router.get("/protected",authMiddleware(["user"]) ,async (req, res)=>{
//     return res.send("This is user routes")
// })


module.exports = router;