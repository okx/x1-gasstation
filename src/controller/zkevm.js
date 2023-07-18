import { handleResponse, handleError } from "../helpers/responseHandler.js";
import { getZkevmRecommendation } from "../services/zkevm.js";

export const getZkevmV1Recommendation = async (req, res, next) => {
    try {
        return handleResponse({
            res,
            data: getZkevmRecommendation(),
        });
    } catch (e) {
        handleError(e, next);
    }
};
