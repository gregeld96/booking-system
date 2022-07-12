require('dotenv').config();

const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWTKEY

function generateToken (payload){
    return jwt.sign(payload, jwtKey);
}

function verifyToken (token){
    return jwt.verify(token, jwtKey);
}

module.exports = {
    generateToken, 
    verifyToken,
};