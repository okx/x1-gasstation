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
    return Number.parseFloat(x).toFixed(9);
  }
  // updates gas price recommendation with latest values
  updateGasPrices(safeLow, standard, fast, baseFee, blockNumber, blockTime) {
      this.safeLow = {
        maxPriorityFee: toNineDecimal(safeLow),
        maxFee: toNineDecimal(safeLow + baseFee)
      }
      this.standard = {
        maxPriorityFee: toNineDecimal(standard),
        maxFee: toNineDecimal(standard + baseFee)
      }
      this.fast = {
        maxPriorityFee: toNineDecimal(fast),
        maxFee: toNineDecimal(fast + baseFee)
      }
      this.estimatedBaseFee = toNineDecimal(baseFee)
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
