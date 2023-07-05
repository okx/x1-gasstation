/**
 * Fetch latest block produced, if it's not already processed & non-empty
 * and update the gas price
 * @param {*} _rec - Recommendation class
 * @param {*} _web3 - web3 instace
 * @returns 
 */
const zkevmV1FetchPrices = async (_rec, _web3) => {
    try {
        const latestBlock = await _web3.eth.getBlock("latest");
        const gasaPrice = await _web3.eth.getGasPrice();

        if (!(_rec.blockNumber < latestBlock.number)) {
            return;
        }

        const blockTime = _rec.blockTimestamp ?
            (latestBlock.timestamp - _rec.blockTimestamp) /
            (latestBlock.number - _rec.blockNumber) : latestBlock.timestamp

        const gasPriceInGwei = _web3.utils.fromWei(gasaPrice, 'gwei')

        _rec.updateGasPrices(
            gasPriceInGwei,
            gasPriceInGwei,
            gasPriceInGwei,
            latestBlock.number,
            blockTime,
            latestBlock.timestamp
        );
    } catch (error) {
        console.error("Error in zkEVM computation\n", error);
    }
};

export default zkevmV1FetchPrices;
