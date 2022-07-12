const route = require('express').Router();
const { authentification } = require('../middlewares/authentication');
const { adminAuthorization } = require('../middlewares/authorization');
const { RoomController } = require('../modules');

route.use(authentification);
route.get('/', RoomController.getList);
route.get('/:id', RoomController.getSpecificRoom);
route.get('/booking/:id', adminAuthorization, RoomController.getEventsRoom);

module.exports = route;