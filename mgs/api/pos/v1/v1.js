const axios = require("axios");
const config = require("../../../config/config").default;

// fetch latest prices, and set recommendations - v1
const posV1FetchPrices = async (_rec) => {
    axios.get(config.api).then((response) => {
        const result = response.data.result;
        const blockTime =
            result[config.v1.blockNumberParam] > _rec.blockNumber
                ? parseInt(
                      6 /
                          (parseInt(result[config.v1.blockNumberParam]) -
                              _rec.blockNumber)
                  )
                : _rec.blockTime;
        _rec.updateGasPrices(
            parseFloat(result[config.v1.safeParam]),
            parseFloat(result[config.v1.standardParam]),
            parseFloat(result[config.v1.fastParam]),
            parseInt(result[config.v1.blockNumberParam]),
            blockTime
        );
    });
};

export default posV1FetchPrices;
