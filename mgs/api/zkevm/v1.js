const humanizeDuration = require("humanize-duration");
const config = require("../../config/config").default;
const Transaction = require("../../models/transaction");

// fetch latest block produced, if it's not already processed & non-empty
// then we'll process each transaction in it, put them in transaction pool,
// after that it'll be computing gas price recommendation depending upon past data
// and env variable values
const zkevmV1FetchPrices = async (_rec, _transactions, _web3) => {
    try {
        const latestBlock = await _web3.eth.getBlock("latest");
        const gasaPrice = await _web3.eth.getGasPrice();

        if (!(_transactions.latestBlockNumber < latestBlock.number)) {
            return;
        }

        const blockTime =
            (latestBlock.timestamp - _transactions.latestBlockTimestamp) /
            (latestBlock.number - _transactions.latestBlockNumber);

        _transactions.latestBlockNumber = latestBlock.number;
        _transactions.latestBlockTimestamp = latestBlock.timestamp;

        _rec.updateGasPrices(
            gasaPrice / 1000000000,
            gasaPrice / 1000000000,
            gasaPrice / 1000000000,
            gasaPrice / 1000000000
        );
        _rec.blockNumber = _transactions.latestBlockNumber;
        _rec.blockTime = blockTime;
    } catch (error) {
        console.error("Error in zkEVM computation\n", error);
    }
};

export default zkevmV1FetchPrices;
