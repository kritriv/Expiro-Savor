const express = require('express');
const router = express.Router();
const { signin, signup, google, signout } = require('../controllers/authController');

const {signupSchema, signinSchema} = require("../validators/auth_validator");
const validate = require("../middleware/validator_middleware");

router.post('/register', validate(signupSchema), signup);
router.post("/login", validate(signinSchema), signin)


module.exports = router;