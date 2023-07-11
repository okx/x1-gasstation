import config from '../config/config.js';
import Web3 from 'web3';
import sleep from './sleep.js';
import Logger from '../helpers/logger.js';



const reconnect = () => {

}

/**
 * obtaining connection to RPC endpoint
 * @param {*} rpc - RPC url 
 * @returns web3 instance
 */
const getWeb3 = (rpc) => {
    try {
        return new Web3(
            rpc.startsWith("http")
                ? new Web3.providers.HttpProvider(rpc)
                : new Web3.providers.WebsocketProvider(rpc)
        );

    } catch(e) {
        Logger.error(e);
    }
}


export default getWeb3;