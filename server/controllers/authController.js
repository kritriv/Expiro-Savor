const User = require("../models/usersList.js");
const bcryptjs = require("bcryptjs");
const { hashPassword, checkRole, comparePassword } = require("../util/utils");
const { generateAccessToken } = require("../service/jwt.service");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(200).json({
        success: false,
        message: "All fields are required.",
      });
    }
    // check user already exist..
    const user = await User.findOne({ email }).lean();
    if (user) {
      return res.status(409).json({
        success: false,
        message: "Email already exist.",
      });
    }
    //check role...
    if (!checkRole(role)) {
      return res.status(201).json({
        success: false,
        message: "Unkown role providing.",
      });
    }
    //hash password ...
    req.body.password = await hashPassword(password);

    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    //generate access token..
    const accessToken = await generateAccessToken(savedUser._id);

    return res.status(201).json({
      success: true,
      message: "Successfully registered.",
      token: accessToken,
      data: savedUser,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "All fields are required.",
      });
    }
    //check user exist
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    // check user password..
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }
    //generate access token..
    const accessToken = await generateAccessToken(user._id);
    return res.status(200).cookie('access_token', accessToken, { httpOnly: true }).json({
      success: true,
      message: "Login successfully.",
      token: accessToken,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const signout = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Signout success!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signin, signup, google, signout };
