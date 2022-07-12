const route = require('express').Router();
const authRoute = require('./auth.routes');
const roomRoute = require('./room.routes');
const bookingRoute = require('./booking.routes');

const prefix = '/api/v1'

route.use(`${prefix}/auths`,authRoute);
route.use(`${prefix}/rooms`,roomRoute);
route.use(`${prefix}/bookings`,bookingRoute);

module.exports = route;