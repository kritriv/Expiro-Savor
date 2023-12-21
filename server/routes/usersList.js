const express = require("express");
const router = express.Router();

const { getAllUsers,postSingleUser, getSingleUser, deleteSingleUser, updateSingleUser} = require("../controllers/usersList")
const { signin, signup, google, signout } = require('../controllers/authController');

// To get All Users list
router.route("/users").get(getAllUsers);

// To Add a User to Users list
router.route("/users/add-user").post(postSingleUser);

// To get Single User Details
router.route("/users/:id").get(getSingleUser);

// To Delete Single User Details
router.route("/users/:id").delete(deleteSingleUser);

// To Update a Single User Details
router.route("/users/:id").put(updateSingleUser);

// To Patch a Single User Details
router.route("/users/:id").patch(updateSingleUser);


router.post('/users/signup', signup);
router.post('/users/signin', signin);
router.post('/users/google', google);
router.post('/users/signout', signout);


module.exports = router;