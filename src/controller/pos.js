import { handleResponse, returnError } from "../helpers/responseHandler.js";
import { getV1Recommendation, getV2Recommendation } from "../services/pos.js";

export const getPosV1Recommendation = async(_, res, next) => {
    try {
        return handleResponse({
            res,
            data: getV1Recommendation()
        })
    } catch(e) {
        returnError(error, next);
    }
}

export const getPosV2Recommendation = async(_, res, next) => {
    try {
        return handleResponse({
            res,
            data: getV2Recommendation()
        })
    } catch(e) {
        returnError(error, next);
    }
}