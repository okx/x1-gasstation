const { config } = require("dotenv");
const path = require("path");

// reading variables from environment file, set them as you
// need in .env file in current working directory
config({ path: path.join(`${__dirname}/..`, ".env"), silent: true });

// setting environment variables
export default {
    api: process.env.API,
    posRPC: process.env.POS_RPC,
    zkevmRPC: process.env.ZKEVM_RPC,
    bufferSize: process.env.BUFFERSIZE,
    v2: {
        safe: parseInt(process.env.v2SAFE),
        standard: parseInt(process.env.v2STANDARD),
        fast: parseInt(process.env.v2FAST),
        historyBlocks: parseInt(process.env.HISTORY_BLOCKS),
    }
};
