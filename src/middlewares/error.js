module.exports = function (err, req, res, next) {
    let statusCode = 500;
    let errorMessage = [];

    switch (err.name) {
        case "NotFoundError":
            statusCode = 400;
            errorMessage.push(err.message);
            break;
        case "JsonWebTokenError":
            statusCode = 401;
            errorMessage.push('Token invalid');
            break;
        default:
            let message = err.message || 'Internal Server Error';
            errorMessage.push(message);
            statusCode = err.status || statusCode
            break;
    }

    res.status(statusCode).json({success: false, message: errorMessage.toString()});
}