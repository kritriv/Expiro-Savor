const jwt = require("jsonwebtoken");
const User = require("../models/usersList");
const dotenv = require("dotenv");
dotenv.config();

function authMiddleware(roles) {
  return async (request, response, next) => {
    try {
      const token = request.headers.authorization;

      if (!token) {
        return response.status(401).json({
          success: false,
          message: "Access token missing.",
        });
      }

      const secretCode = process.env.JWT_SECRET_TOKEN;
      const decode = await jwt.verify(token, secretCode);

      if (!decode) {
        return response.status(403).json({
          success: false,
          message: "Access denied.",
        });
      }

      const findUser = await User.findOne(
        { _id: decode._id },
        { _id: 1, role: 1 }
      ).lean();
      // check user role match with protected routes
      if (!roles.includes(findUser.role)) {
        return response.status(403).json({
          success: false,
          message: "Access Denied.",
        });
      }
      request.user = findUser;
      next();

      if (!decode) {
        return response.status(403).json({
          success: false,
          message: "Access denied.",
        });
      }
    } catch (error) {
      console.log("error", error);
      return response.status(error.status || 500).json({
        success: false,
        message: "Access Denied.",
      });
    }
  };
}

module.exports = { authMiddleware };
