const route = require('express').Router();
const { authentification } = require('../middlewares/authentication');
const { adminAuthorization } = require('../middlewares/authorization');
const { BookingController } = require('../modules');

route.use(authentification);
route.get('/', BookingController.getList);
route.get('/:id', BookingController.getSpecificEvent);
route.post('/', BookingController.create);
route.put('/:id', BookingController.update);
route.delete('/:id', adminAuthorization, BookingController.delete);

module.exports = route;