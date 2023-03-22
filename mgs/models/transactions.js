// class for holding all transactions, which are to be considered
// for making gas price recommendation
module.exports = class Transactions {
    all = [];

    // specify transaction pool size, when overflowing
    // oldest transactions to be removed from it
    constructor(size) {
        this.size = size;
    }

    // add a new transaction to pool,
    // while keeping size of pool in mind,
    // if we're going to overflow, remove oldest one & then add this
    add(transaction) {
        if (this.all.length >= this.size) {
            this.all.shift();
        }

        this.all.push(transaction);
    }

    // extract gas prices from transaction pool
    extractGasPrices = () => this.all.map((v) => v.gasPrice);

    // sort extracted gas prices ascendingly
    ascendingGasPrices = () => this.extractGasPrices().sort((a, b) => a - b);

    // compute cumulative sum of gas prices, from ascendingly sorted price set
    cumulativeSumOfGasPrices() {
        let buffer = [];
        let prices = this.ascendingGasPrices();
        let upto = 0;

        for (let i = 0; i < prices.length; i++) {
            buffer.push([prices[i], upto + prices[i]]);
            upto += prices[i];
        }

        return buffer;
    }

    // compute cumulative percentage of gas prices, from cumulative sum of
    // gas prices
    cumulativePercentageOfGasPrices() {
        let buffer = this.cumulativeSumOfGasPrices();
        let max = buffer[buffer.length - 1][1];

        return buffer.map((v) => [v[0], (v[1] / max) * 100]);
    }

    // compute gas price recommendation for specified category
    // i.e. {SAFELOW, STANDARD, FAST, FASTEST}, where we'll compute
    // minimum gas price at which all transactions were getting accepted by network
    getMinGasPriceWithAcceptanceRateX = (gasPrices, x) =>
        Math.min(...gasPrices.filter((v) => v[1] >= x).map((v) => v[0]));

    // compute latest block number, upto which processing has been done
    // this will be helpful to avoid re-consideration of same block again & again
    get latestBlockNumber() {
        return this.all.length == 0
            ? 0
            : Math.max(...this.all.map((v) => v.blockNumber));
    }
};
