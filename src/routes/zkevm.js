import express from "express";
import { getZkevmV1Recommendation } from "../controller/zkevm.js";

const router = express.Router();

//Get Zkevm recommendation
router.get("/", getZkevmV1Recommendation);

export default router;
