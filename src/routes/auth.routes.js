const route = require('express').Router();
const { UserController } = require('../modules');

route.post('/sign-in', UserController.signIn);
route.post('/sign-up', UserController.signUp);

module.exports = route;