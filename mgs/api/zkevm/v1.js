const humanizeDuration = require("humanize-duration");
const config = require("../../config/config").default;
const Transaction = require("../../models/transaction");

// given hash of transaction i.e. unique identifier, it will
// fetch that transaction and put it inside transaction pool,
// for further processing purposes
const processTransaction = async (
    _web3,
    _hash,
    _blockNumber,
    idx,
    _transactions
) => {
    const start = new Date().getTime();
    const _transaction = await _web3.eth.getTransaction(_hash);

    if (_transaction !== null) {
        const gasPrice = parseInt(_transaction.gasPrice, 10) / 1e9;
        _transactions.add(
            new Transaction(
                _transaction.blockNumber,
                gasPrice > 0 ? gasPrice : 1
            )
        );
    }
};

// given a non-empty ( having atleast 1 transaction ) block object, it'll
// go through each of them & put them inside transaction pool
const processBlock = async (_web3, _transactions, _block) => {
    console.log(`🔅 Processing zkEVM Block : ${_block.number}`);

    const start = new Date().getTime();
    const promises = [];

    for (let i = 0; i < _block.transactions.length; i++) {
        promises.push(
            processTransaction(
                _web3,
                _block.transactions[i],
                _block.number,
                i,
                _transactions
            )
        );
    }

    await Promise.all(promises);

    console.log(
        `✅ zkEVM Block : ${_block.number} processed in ${humanizeDuration(
            new Date().getTime() - start
        )}`
    );
};

// fetch latest block produced, if it's not already processed & non-empty
// then we'll process each transaction in it, put them in transaction pool,
// after that it'll be computing gas price recommendation depending upon past data
// and env variable values
const zkevmV1FetchPrices = async (_rec, _transactions, _web3) => {
    const latestBlock = await _web3.eth.getBlock("latest");

    if (!(_transactions.latestBlockNumber < latestBlock.number)) {
        return;
    }

    const blockTime =
        (latestBlock.timestamp - _transactions.latestBlockTimestamp) /
        (latestBlock.number - _transactions.latestBlockNumber);

    _transactions.latestBlockNumber = latestBlock.number;
    _transactions.latestBlockTimestamp = latestBlock.timestamp;

    if (latestBlock.transactions.length == 0) {
        _transactions.latestBlockNumber = latestBlock.number;
        _transactions.latestBlockTimestamp = latestBlock.timestamp;

        console.log(`❗️ Empty zkEVM Block : ${latestBlock.number}`);
        return;
    }

    await processBlock(_web3, _transactions, latestBlock);
    const cumsumGasPrices = _transactions.cumulativePercentageOfGasPrices();

    _rec.updateGasPrices(
        _transactions.getMinGasPriceWithAcceptanceRateX(
            cumsumGasPrices,
            config.zkevmV1.safeLow
        ),
        _transactions.getMinGasPriceWithAcceptanceRateX(
            cumsumGasPrices,
            config.zkevmV1.standard
        ),
        _transactions.getMinGasPriceWithAcceptanceRateX(
            cumsumGasPrices,
            config.zkevmV1.fast
        ),
        _transactions.getMinGasPriceWithAcceptanceRateX(
            cumsumGasPrices,
            config.zkevmV1.fastest
        )
    );
    _rec.blockNumber = _transactions.latestBlockNumber;
    _rec.blockTime = blockTime;
};

export default zkevmV1FetchPrices;
