const axios = require("axios");
const Web3 = require("web3");
const config = require("../../../config/config").default;

const web3 = new Web3();

// function to format fee history response
function formatFeeHistory(result, includePending) {
    const initBlockNum = Number(result.oldestBlock);
    let blockNum = initBlockNum;
    let index = 0;
    const blocks = [];
    while (blockNum < initBlockNum + config.v2.historyBlocks) {
        blocks.push({
            number: blockNum,
            baseFeePerGas: Number(result.baseFeePerGas[index]),
            gasUsedRatio: Number(result.gasUsedRatio[index]),
            priorityFeePerGas: result.reward[index].map((x) => Number(x)),
        });
        blockNum += 1;
        index += 1;
    }
    if (includePending) {
        blocks.push({
            number: "pending",
            baseFeePerGas: Number(
                result.baseFeePerGas[config.v2.historyBlocks]
            ),
            gasUsedRatio: NaN,
            priorityFeePerGas: [],
        });
    }
    return blocks;
}

// Functions to calculate average fee estimations
function avg(arr) {
    let invalidValues = 0;
    const sum = arr.reduce((a, v) => {
        if (v == 0) {
            invalidValues += 1;
        }
        return a + v;
    });
    const average = sum / (arr.length - invalidValues) / 1e9;
    return average > 30 ? average : 30;
}

function avgBaseFee(arr) {
    const change = ((arr[5] - arr[0]) * 10) / config.v2.historyBlocks;
    return Math.round(arr[config.v2.historyBlocks - 1] + change) / 1e9;
}

// fetch latest prices, and set recommendations - v2
const posV2FetchPrices = async (_rec) => {
    const blockNumber = await axios
        .post(config.posRPC, {
            jsonrpc: "2.0",
            method: "eth_blockNumber",
            params: [],
            id: 1,
        })
        .then((response) => {
            return web3.utils.hexToNumber(response.data.result);
        });
    const blockTime =
        blockNumber > _rec.blockNumber
            ? parseInt(6 / (blockNumber - _rec.blockNumber))
            : _rec.blockTime;

    await axios
        .post(config.posRPC, {
            jsonrpc: "2.0",
            method: "eth_feeHistory",
            params: [
                config.v2.historyBlocks,
                "pending",
                [config.v2.safe, config.v2.standard, config.v2.fast],
            ],
            id: 1,
        })
        .then((response) => {
            if (response.data.result) {
                const blocks = formatFeeHistory(response.data.result, false);
                const safeLow = avg(blocks.map((b) => b.priorityFeePerGas[0]));
                const standard = avg(blocks.map((b) => b.priorityFeePerGas[1]));
                const fast = avg(blocks.map((b) => b.priorityFeePerGas[2]));
                const baseFeeEstimate = avgBaseFee(
                    blocks.map((b) => b.baseFeePerGas)
                );

                _rec.updateGasPrices(
                    safeLow,
                    standard,
                    fast,
                    baseFeeEstimate,
                    blockNumber,
                    blockTime
                );
            }
        });
};

export default posV2FetchPrices;
