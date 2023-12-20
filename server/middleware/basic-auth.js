require("dotenv").config();
const auth = require('basic-auth');

const CheckUsername = process.env.ApiUsername.replace(';', '');
const CheckPassword = process.env.ApiPassword.replace(';', '');


// Middleware for Basic Authentication
const authenticate = async (req, res, next) => {
    try {
        const credentials = await auth(req);
        if (!credentials || (credentials.name !== CheckUsername || credentials.pass !== CheckPassword)) {
            res.set('WWW-Authenticate', 'Basic realm="Restricted Access"');
            return res.status(401).send('Unauthorized User');
        }
        next();
    } catch (error) {
        res.status(500).send('Error authenticating');
    }
};


module.exports = authenticate;