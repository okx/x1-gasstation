import startApi from "./server.js";
import v1Recommendation from "./models/v1recommendation.js";
import v2Recommendation from "./models/v2recommendation.js";
import config from './config/config.js';
import sleep from "./utils/sleep.js";
import getWeb3 from "./utils/web3.js";
import Logger from "./helpers/logger.js";
import posV2FetchPrices from "./services/pos.js";
import zkevmV1FetchPrices from "./services/zkevm.js";

const posV1recommendation = new v1Recommendation();
const posV2recommendation = new v2Recommendation();
const zkevmV1recommendation = new v1Recommendation();

// posWeb3.currentProvider.on('error', (err) => console.log(err))

/**
 * infinite loop, for keep fetching latest block data, for computing
 * gas price recommendation using past data available
 * 
 * @param {*} _v1rec - V1 recommendation class
 * @param {*} _v2rec - v2 recommendation class
 * @param {*} _web3 - web3 instance
 */

const runPoS = async(_v1rec, _v2rec, _web3) => {
    Logger.info('Started PoS service...');

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
const runZKEVMv1 = async(_v1rec, _web3) => {
    Logger.info('Started Zkevm service...');

    while (true) {
        await zkevmV1FetchPrices(_v1rec, _web3);
        await sleep(10000);
    }
};

Logger.info('Matic Gas station is running....')


/**
 * Function to start the PoS service
 */
const startPosService = async() => {
    const posWeb3 = await getWeb3(config.posRPC);
    runPoS(posV1recommendation, posV2recommendation, posWeb3)
    .then((_) => {})
    .catch((e) => {
        Logger.error(e);
        Logger.info('Restarting PoS service...')
        startPosService();
    });
}


/**
 * Function to start the Zkevm service
 */
const startZkevmService = async() => {
    const zkevmWeb3 = await getWeb3(config.zkevmRPC);
    runZKEVMv1(zkevmV1recommendation, zkevmWeb3)
    .then((_) => {})
    .catch((e) => {
        Logger.error(e);
        Logger.info('Restarting zkem service....')
        startZkevmService();
    });
}


//Start Pos service
startPosService();

//Start Zkevm service
startZkevmService();

//Start Api
startApi();
