import Logger from "../helpers/logger.js";
import * as Error from "../helpers/errorClass.js";

export const isHandledError = (err) => {
    try {
        return (
            err instanceof Error.ApiBadRequestError ||
            err instanceof Error.ApiNotFoundError ||
            err instanceof Error.ApiUnauthorizeError ||
            err instanceof Error.ApiForbiddenError ||
            err instanceof Error.ApiValdiationError
        );
    } catch (error) {
        Logger.error(error);
        return false;
    }
};
