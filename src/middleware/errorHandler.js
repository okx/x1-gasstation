import constants from "../config/constants.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
        // set default
        statusCode: err.statusCode || constants.RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong try again later",
        messageDetails: err.description || null,
        errorReason: err.errorReason || null,
    };

    return res.status(customError.statusCode).json({
        success: false,
        data: {
            message: customError.message,
            messageDetails: customError.messageDetails,
            errorReason: customError.errorReason,
        },
    });
};
