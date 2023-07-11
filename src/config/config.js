import { config } from 'dotenv';
import path from 'path';
import url from 'url';
import { getMetaUrl } from '../utils/importMetadata.js';

const __filename = url.fileURLToPath(getMetaUrl());
const __dirname = path.dirname(__filename);

// reading variables from environment file, set them as you
// need in .env file in current working directory
config({ path: path.join(__dirname, "../.env"), silent: true });


// setting environment variables
export default {
    posRPC: process.env.POS_RPC,
    zkevmRPC: process.env.ZKEVM_RPC,
    v2: {
        safe: parseInt(process.env.v2SAFE),
        standard: parseInt(process.env.v2STANDARD),
        fast: parseInt(process.env.v2FAST),
        historyBlocks: parseInt(process.env.HISTORY_BLOCKS),
    }
};