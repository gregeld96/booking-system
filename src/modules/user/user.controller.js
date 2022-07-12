const userService = require('./user.service');

class UserController {
    static async signIn(req, res, next){
        try {
            res.status(200).json({success: true, message: "Successful login", data: await userService.signIn(req)});
        } catch (error) {
            next(error);
        }
    }

    static async signUp(req, res, next){
        try {
            res.status(201).json({success: true, message: "Success create user", data: await userService.signUp(req)});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;