import express from "express";
import { getZkevmV1Recommendation, getZkevmV1CardonaRecommendation } from "../controller/zkevm.js";
import config from "../config/config.js";

const router = express.Router();

//Get Zkevm recommendation
router.get("/", getZkevmV1Recommendation);
router.get("/v1", getZkevmV1Recommendation);

if (config.NODE_ENV === ('prod-testnet' || 'staging-testnet')) {
    //Get zkEVM Cardona recommendation
    router.get("/cardona/", getZkevmV1CardonaRecommendation);
}

export default router;
