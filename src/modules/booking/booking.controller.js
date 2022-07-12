const bookingService = require('./booking.service');

class BookingController {
    static async getList(req, res, next){
        try {
            res.status(200).json({success: true, message: "Success get all booking list", data: await bookingService.getList(req)})
        } catch (error) {
            next(error)
        }
    }

    static async getSpecificEvent(req, res, next){
        try {
            res.status(200).json({success: true, message: "Success get specific booking", data: await bookingService.getSpecificBooking(req)})
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next){
        try {
            await bookingService.create(req);

            res.status(200).json({success: true, message: "Success create booking request"});
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next){
        try {
            await bookingService.update(req);

            res.status(200).json({success: true, message: "Success update booking request"});
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next){
        try {
            await bookingService.delete(req);

            res.status(200).json({success: true, message: "Success delete booking request"});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BookingController;