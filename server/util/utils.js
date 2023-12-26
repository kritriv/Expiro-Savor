const bcrypt = require('bcryptjs');
const {Roles} = require('../config/config');

async function hashPassword (password){
    return await bcrypt.hash(password,10)
}


async function comparePassword(password,hashPassword){
    return await bcrypt.compare(password,hashPassword);
}

 function checkRole(role){
    return Roles.includes(role);
}




module.exports = {hashPassword,comparePassword,checkRole}