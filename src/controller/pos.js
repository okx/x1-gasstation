import { handleResponse, handleError } from "../helpers/responseHandler.js";
import { getV1Recommendation, getV2Recommendation, getAmoyV1Recommendation, getAmoyV2Recommendation } from "../services/pos.js";

export const getPosV1Recommendation = async (_, res, next) => {
    try {
        return handleResponse({
            res,
            data: getV1Recommendation(),
        });
    } catch (e) {
        handleError(e, next);
    }
};

export const getPosV2Recommendation = async (_, res, next) => {
    try {
        return handleResponse({
            res,
            data: getV2Recommendation(),
        });
    } catch (e) {
        handleError(e, next);
    }
};

export const getPosAmoyV1Recommendation = async (_, res, next) => {
    try {
        return handleResponse({
            res,
            data: getAmoyV1Recommendation(),
        });
    } catch (e) {
        handleError(e, next);
    }
};

export const getPosAmoyV2Recommendation = async (_, res, next) => {
    try {
        return handleResponse({
            res,
            data: getAmoyV2Recommendation(),
        });
    } catch (e) {
        handleError(e, next);
    }
};
