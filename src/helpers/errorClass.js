import constants from "../config/constants.js";

class BaseError extends Error {
    constructor(message, statusCode, description, errorReason) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        this.statusCode = statusCode;
        this.description = description;
        this.errorReason = errorReason;
        Error.captureStackTrace(this);
    }
}

class Api404Error extends BaseError {
    constructor(
        message,
        statusCode = constants.RESPONSE_STATUS_CODES.NOT_FOUND,
        description = ""
    ) {
        super(message, statusCode, description);
    }
}

class Api400Error extends BaseError {
    constructor(
        message,
        statusCode = constants.RESPONSE_STATUS_CODES.BAD_REQUEST,
        description = "",
        errorReason = ""
    ) {
        super(message, statusCode, description, errorReason);
    }
}

class Api401Error extends BaseError {
    constructor(
        message,
        statusCode = constants.RESPONSE_STATUS_CODES.INPUT_VALIDATION_ERROR,
        description = ""
    ) {
        super(message, statusCode, description);
    }
}

class Api422Error extends BaseError {
    constructor(
        message,
        statusCode = constants.RESPONSE_STATUS_CODES.INPUT_VALIDATION_ERROR,
        description = "",
        errorReason
    ) {
        super(message, statusCode, description, errorReason);
    }
}

class Api403Error extends BaseError {
    constructor(message, statusCode = 403, description = "") {
        super(message, statusCode, description);
    }
}

export const ApiNotFoundError = Api404Error;
export const ApiBadRequestError = Api400Error;
export const ApiUnauthorizeError = Api401Error;
export const ApiForbiddenError = Api403Error;
export const ApiValdiationError = Api422Error;
