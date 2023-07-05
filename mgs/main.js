import Web3 from "web3";
import posV2FetchPrices from "./api/pos/v2/v2";
import zkevmV1FetchPrices from "./api/zkevm/v1";
import config from "./config/config";
const v1Recommendation = require("./models/v1recommendation");
const v2Recommendation = require("./models/v2recommendation");
const { runServer } = require("./api/serve");

/**
 * obtaining connection to RPC endpoint
 * @param {*} rpc - RPC url 
 * @returns web3 instance
 */
const getWeb3 = (rpc) =>
    new Web3(
        rpc.startsWith("http")
            ? new Web3.providers.HttpProvider(rpc)
            : new Web3.providers.WebsocketProvider(rpc)
    );

// sleep for `ms` miliseconds, just do nothing
const sleep = async (ms) =>
    new Promise((res, _) => {
        setTimeout(res, ms);
    });

/**
 * infinite loop, for keep fetching latest block data, for computing
 * gas price recommendation using past data available
 * 
 * @param {*} _v1rec - V1 recommendation class
 * @param {*} _v2rec - v2 recommendation class
 * @param {*} _web3 - web3 instance
 */

const runPoS = async (_v1rec, _v2rec, _web3) => {
    while (true) {
        await posV2FetchPrices(_v1rec, _v2rec, _web3);
        await sleep(5000);
    }
};

/**
 * infinite loop, for keep fetching latest block data, for computing
 * gas price recommendation using past data available
 * 
 * @param {*} _v1rec - V1 recommendation class
 * @param {*} _web3 - web3 instance
 */
const runZKEVMv1 = async (_v1rec, _web3) => {
    while (true) {
        await zkevmV1FetchPrices(_v1rec, _web3);
        await sleep(10000);
    }
};

const posV1recommendation = new v1Recommendation();
const posV2recommendation = new v2Recommendation();
const zkevmV1recommendation = new v1Recommendation();
const zkevmWeb3 = getWeb3(config.zkevmRPC);
const posWeb3 = getWeb3(config.posRPC);

console.log("🔥 Matic Gas Station running ...");

runPoS(posV1recommendation, posV2recommendation, posWeb3)
    .then((_) => {})
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

runZKEVMv1(zkevmV1recommendation, zkevmWeb3)
    .then((_) => {})
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

runServer(posV1recommendation, posV2recommendation, zkevmV1recommendation);
