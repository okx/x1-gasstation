/**
 * Class for storing, publishing gas price recommendations
 * along with blocktime & block number when recommendation was made
 */
export default class v1Recommendation  {
    safeLow = NaN
    standard = NaN
    fast = NaN
    blockTime = 0
    blockNumber = 0
    blockTimestamp = 0

    /**
     * updates gas price recommendation with latest values
     * 
     * @param safeLow
     * @param standard
     * @param fast
     * @param blockNumber
     * @param blockTime
     * @param blockTimestamp
     * 
     * @returns {void}
     */
    updateGasPrices(safeLow, standard, fast, blockNumber, blockTime, blockTimestamp) {
        this.safeLow = safeLow
        this.standard = standard
        this.fast = fast
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
            blockTime: this.blockTime,
            blockNumber: this.blockNumber
        }
    }
}