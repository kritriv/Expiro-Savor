const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function generateAccessToken(userId) {
  try {
    const secretCode = process.env.JWT_SECRET_TOKEN;
    const expirationTime = Math.floor(Date.now() / 1000) + 300; // Current time + 1 hour in seconds
    return jwt.sign({ _id: userId }, secretCode, { expiresIn: expirationTime });
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new Error('Failed to generate access token');
  }
}

module.exports = { generateAccessToken };
