const roomService = require('./room.service');

class RoomController {
    static async getList(req, res, next){
        try {
            res.status(200).json({success: true, message: "Success get all list room", data: await roomService.getRoomList()});
        } catch (error) {
            next(error);
        }
    }

    static async getSpecificRoom(req, res, next){
        try {
            res.status(200).json({success: true, message: "Success get specific room", data: await roomService.getSpecificRoom({id: req.params.id})});
        } catch (error) {
            next(error);
        }
    }

    static async getEventsRoom(req, res, next){
        try {
            res.status(200).json({success: true, message: "Success get event in specific room", data: await roomService.getEventsRoom(req)});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = RoomController;