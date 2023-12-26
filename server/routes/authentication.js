const express = require('express');
const router = express.Router();
const { signin, signup, google, signout } = require('../controllers/authController');

router.post('/register',signup);
router.post("/login",signin)


module.exports = router;