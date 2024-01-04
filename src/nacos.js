import { config } from "dotenv";
import path from "path";
import Logger from "./helpers/logger.js";
import url from "url";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const NacosNamingClient = require('nacos').NacosNamingClient;
const logger = console;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, ".env"), silent: true });
Logger.create({
    sentry: {
        dsn: process.env.SENTRY_DSN,
        level: "error",
    },
    datadog: {
        api_key: process.env.DATADOG_API_KEY,
        service_name: process.env.DATADOG_APP_KEY,
    },
});

const startNacos = async () => {
    if (process.env.NacosURLs != null && process.env.NacosURLs != ""){
        Logger.info(`🔥 start nacos....`);
        Logger.info(`${process.env.NacosURLs},${process.env.NacosNamespaceId},${process.env.NacosApplicationName},${process.env.NacosExternalListenAddr}`);
        const logger = console
        const providerServiceName = process.env.NacosApplicationName;
        const nacosServerAddress = process.env.NacosURLs;
        const providerNamespase = process.env.NacosNamespaceId;
        const client = new NacosNamingClient({
            logger,
            serverList: nacosServerAddress,
            namespace: providerNamespase,
        });
        Logger.info('[Nacos] start register nacos');
        (async () => {
            const allinstance = await client.getAllInstances()
            Logger.info('[Nacos]----allinstance----', allinstance)
        });
        (async () => {
            try {
                var resultArray = process.env.NacosExternalListenAddr.split(':');
                var ipAddr = resultArray[0];
                var port = resultArray[1];
                await client.ready();
                await client.registerInstance(providerServiceName, {
                    ip: ipAddr,
                    port
                });
                Logger.info(`🔥 start nacos success:${ipAddr}:${port}`);
            } catch (err) {
                Logger.info('[Nacos] Nacos reister failed: ' + err.toString());
            }
        })();
    }
};

export default startNacos;
