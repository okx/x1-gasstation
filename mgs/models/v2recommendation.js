// class for storing, publishing gas price recommendations
// along with blocktime & block number when recommendation was made
module.exports = class v2Recommendation {
  safeLow = {}
  standard = {}
  fast = {}
  estimatedBaseFee = NaN
  blockTime = NaN
  blockNumber = NaN

  toNineDecimal(x) {
    return Number.isInteger(x) ? x : Number(x).toFixed(9);
  }
  // updates gas price recommendation with latest values
  updateGasPrices(safeLow, standard, fast, baseFee, blockNumber, blockTime) {
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
  }

  // To be invoked when responding to client request
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
