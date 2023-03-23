import posV1FetchPrices from "./api/pos/v1/v1";
import posV2FetchPrices from "./api/pos/v2/v2";
import zkevmV1FetchPrices from "./api/zkevm/v1";
const v1Recommendation = require("./models/recommendation");
const v2Recommendation = require("./models/v2recommendation");
const { runServer } = require("./api/serve");

// sleep for `ms` miliseconds, just do nothing
const sleep = async (ms) =>
    new Promise((res, _) => {
        setTimeout(res, ms);
    });

// infinite loop, for keep fetching latest block data, for computing
// gas price recommendation using past data available
const runPoSv1 = async (_v1rec) => {
    while (true) {
        await posV1FetchPrices(_v1rec);
        await sleep(5000);
    }
};

const runPoSv2 = async (_v2rec) => {
    while (true) {
        await posV2FetchPrices(_v2rec);
        await sleep(5000);
    }
};

const runZKEVMv1 = async (_v1rec) => {
    while (true) {
        await zkevmV1FetchPrices(_v1rec);
        await sleep(5000);
    }
};

const posV1recommendation = new v1Recommendation();
const posV2recommendation = new v2Recommendation();
const zkevmV1recommendation = new v1Recommendation();

console.log("🔥 Matic Gas Station running ...");

runPoSv1(posV1recommendation)
    .then((_) => {})
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

runPoSv2(posV2recommendation)
    .then((_) => {})
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

runZKEVMv1(zkevmV1recommendation)
    .then((_) => {})
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

runServer(posV1recommendation, posV2recommendation);
