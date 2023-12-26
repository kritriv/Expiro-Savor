const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function generateAccessToken (userId){
    const secretCode = process.env.JWT_SECRET_TOKEN;
    return await jwt.sign({_id:userId},secretCode);
}

module.exports={generateAccessToken}
