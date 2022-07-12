require('dotenv').config();

const bcrypt = require('bcryptjs');
const saltKey = process.env.SALTKEY;

function hashPassword (inputPassword) {
    var salt = bcrypt.genSaltSync(Number(saltKey));
    return bcrypt.hashSync(inputPassword, salt);
}

function checkPassword (inputPassword, hashingPassword) {
    return bcrypt.compareSync(inputPassword, hashingPassword)    
}

module.exports = {
    hashPassword, 
    checkPassword
};