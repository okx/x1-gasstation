import express from "express";
import { getPosV1Recommendation, getPosV2Recommendation, getPosAmoyV1Recommendation, getPosAmoyV2Recommendation } from "../controller/pos.js";
import config from "../config/config.js";

const router = express.Router();

//Get PoS v2 recommendation
router.get("/", getPosV2Recommendation);

//Get PoS v1 recommendation
router.get("/v1", getPosV1Recommendation);

//Get PoS v2 recommendation
router.get("/v2", getPosV2Recommendation);

if (config.NODE_ENV === 'prod-testnet' || 'staging-testnet') {
    //Get PoS amoy recommendation
    router.get("/amoy/", getPosAmoyV2Recommendation);

    //Get PoS amoy recommendation
    router.get("/amoy/v1", getPosAmoyV1Recommendation);

    //Get PoS amoy recommendation
    router.get("/amoy/v2", getPosAmoyV2Recommendation);
}

export default router;
