import config from '../config/config.js';
import Web3 from 'web3';
import sleep from './sleep.js';
import Logger from '../helpers/logger.js';

/**
 * obtaining connection to RPC endpoint
 * @param {*} rpc - RPC url 
 * @returns web3 instance
 */
const getWeb3 = async(rpc) => {
    try {
        const web3 =  new Web3(
            rpc.startsWith("http")
                ? new Web3.providers.HttpProvider(rpc)
                : new Web3.providers.WebsocketProvider(rpc)
        );

        return web3;

    } catch(e) {
        Logger.error(e);

        Logger.warn('Retrying the connection to RPC')
        await sleep(3000);
        return getWeb3(rpc);
    }
}

export default getWeb3;