const jwt = require("jsonwebtoken");
const User = require("../models/usersList");
const dotenv = require("dotenv");
dotenv.config();

function authMiddleware(roles) {
  return async (request, response, next) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({
          success: false,
          message: "Access token missing or invalid format.",
        });
      }

      const token = authHeader.split(' ')[1]; // Extract token after "Bearer "
      const secretCode = process.env.JWT_SECRET_TOKEN;
      let decoded;
      try {
        decoded = jwt.verify(token, secretCode);
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return response.status(401).json({
            success: false,
            message: "Token expired.",
          });
        } else if (err instanceof jwt.JsonWebTokenError) {
          return response.status(401).json({
            success: false,
            message: "Invalid token.",
          });
        } else {
          return response.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: err.message,
          });
        }
      }

      // Check user role and perform role-based access control
      const findUser = await User.findOne(
        { _id: decoded._id },
        { _id: 1, role: 1 }
      ).lean();

      if (!findUser || !roles.includes(findUser.role)) {
        return response.status(403).json({
          success: false,
          message: `Access Denied! ${findUser.role} is not allow for this Path.`,
        });
      }

      // Access granted, set user data on the request object
      request.user = findUser;
      next();
    } catch (error) {
      console.error("Error:", error);
      return response.status(500).json({
        success: false,
        message: "Internal Server Error.",
        error: error.message,
      });  
    }
  };
}

module.exports = { authMiddleware };
