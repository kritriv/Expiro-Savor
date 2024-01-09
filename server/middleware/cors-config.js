// middleware/ip-filter.js
const allowedIPs = ['122.161.51.253', '127.0.0.1', '::1']; // Define your allowed IP addresses

const allowOnlyIPs = (req, res, next) => {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(`Accessing IP: ${clientIP}`); // Log the accessing IP address

    if (!allowedIPs.includes(clientIP)) {
        return res.status(403).send('Forbidden: Access denied for your IP.');
    }

    next();
};

module.exports = {
    allowOnlyIPs,
};
