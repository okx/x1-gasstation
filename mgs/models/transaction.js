// class for holding transaction data
// low footprint, only holding blocknumber
// ( which block is this transaction part of ) & gas
// price ( how much user paid in gas price)
//
// blocknumber is kept to keep track of, that we're not
// reprocessing same block data
//
// gas price to be used for computing price recommendation
module.exports = class Transaction {
    constructor(blockNumber, gasPrice) {
        this.blockNumber = blockNumber;
        this.gasPrice = gasPrice;
    }
};
