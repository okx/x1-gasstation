/**
 * Class for storing, publishing gas price recommendations
 * along with blocktime & block number when recommendation was made
 */
module.exports = class v2Recommendation {
    safeLow = {}
    standard = {}
    fast = {}
    estimatedBaseFee = NaN
    blockTime = 0
    blockNumber = 0
    blockTimestamp = 0

    /**
     * Convert to fixed decimals
     * @param x - Number or Number string
     * @returns - Fixed decimal to 9 digits
     */
    toNineDecimal(x) {
        return Number.isInteger(x) ? x : Number(x).toFixed(9);
    }
    /**
     * Update gas prices
     * 
     * @param {*} safeLow 
     * @param {*} standard 
     * @param {*} fast 
     * @param {*} baseFee 
     * @param {*} blockNumber 
     * @param {*} blockTime 
     * @param {*} blockTimestamp
     */
    // updates gas price recommendation with latest values
    updateGasPrices(safeLow, standard, fast, baseFee, blockNumber, blockTime, blockTimestamp) {
        this.safeLow = {
            maxPriorityFee: this.toNineDecimal(safeLow),
            maxFee: this.toNineDecimal(safeLow + baseFee)
        }
        this.standard = {
            maxPriorityFee: this.toNineDecimal(standard),
            maxFee: this.toNineDecimal(standard + baseFee)
        }
        this.fast = {
            maxPriorityFee: this.toNineDecimal(fast),
            maxFee: this.toNineDecimal(fast + baseFee)
        }
        this.estimatedBaseFee = this.toNineDecimal(baseFee)
        this.blockNumber = blockNumber
        this.blockTime = blockTime
        this.blockTimestamp = blockTimestamp
    }

    /**
     * To be invoked when responding to client request
     */
    servable() {
        return {
            safeLow: this.safeLow,
            standard: this.standard,
            fast: this.fast,
            estimatedBaseFee: this.estimatedBaseFee,
            blockTime: this.blockTime,
            blockNumber: this.blockNumber
        }
    }
}
