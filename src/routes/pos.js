import express from "express";
import { getPosV1Recommendation, getPosV2Recommendation } from "../controller/pos.js";

const router = express.Router();

//Get PoS v2 recommendation
router.get("/", getPosV2Recommendation);

//Get PoS v1 recommendation
router.get('/v1', getPosV1Recommendation)

//Get PoS v2 recommendation
router.get('/v2', getPosV2Recommendation);

export default router;