import Logger from "../helpers/logger.js";

let zkevmRecommendation;
let zkevmCardonaRecommendation;

/**
 * Fetch latest block produced, if it's not already processed & non-empty
 * and update the gas price
 * @param {*} _rec - Recommendation class
 * @param {*} _web3 - web3 instace
 * @returns
 */
const zkevmV1FetchPrices = async (_rec, _web3, network = 'mainnet') => {
    try {
        if (network === 'cardona') {
            zkevmCardonaRecommendation = _rec;
        } else {
            zkevmRecommendation = _rec
        }
        
        const latestBlock = await _web3.eth.getBlock("latest");
        const gasaPrice = await _web3.eth.getGasPrice();

        let blockNumber = latestBlock.number;
        let timestamp = latestBlock.timestamp;

        if (typeof blockNumber === "bigint") {
            blockNumber = parseInt(blockNumber);
        }

        if (typeof timestamp === "bigint") {
            timestamp = parseInt(timestamp);
        }

        if (!(_rec.blockNumber < blockNumber)) {
            return;
        }

        const blockTime = _rec.blockTimestamp
            ? (timestamp - _rec.blockTimestamp) / (blockNumber - _rec.blockNumber)
            : timestamp;

        const gasPriceInGwei = Number(_web3.utils.fromWei(gasaPrice, "gwei"));

        _rec.updateGasPrices(gasPriceInGwei, gasPriceInGwei, gasPriceInGwei, blockNumber, blockTime, timestamp);
    } catch (error) {
        Logger.error({
            location: "zkevmV1FetchPrices",
            error,
        });
    }
};

export const getZkevmRecommendation = () => {
    return zkevmRecommendation.servable();
};

export const getZkevmCardonaRecommendation = () => {
    return zkevmCardonaRecommendation.servable();
};

export default zkevmV1FetchPrices;
