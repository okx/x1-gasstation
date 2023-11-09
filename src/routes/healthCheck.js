import express from "express";
import getWeb3 from "../utils/web3.js";
import config from "../config/config.js";
import Logger from "../helpers/logger.js";

const router = express.Router();

router.get("/", async (req, res) => {
    let posRPCStatus = "running";
    let zkevmRPCStatus = "running";
    const posWeb3 = getWeb3(config.posRPC);
    const zkevmWeb3 = getWeb3(config.zkevmRPC);

    if (!(await posWeb3.eth.net.isListening())) {
        posRPCStatus = "failed";
    }

    try {
        await zkevmWeb3.eth.getBlock("latest");
    } catch (e) {
        Logger.error(e);
        zkevmRPCStatus = "failed";
    }

    res.status(200).json({ success: true, server: "running", posRPCStatus, zkevmRPCStatus });
});

export default router;
