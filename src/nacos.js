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

        const client = new NacosNamingClient({
            logger,
            serverAddr: process.env.NacosURLs, // replace to real nacos serverList
            namespace: process.env.NacosNamespaceId,
          });
          await client.ready();
          
          var resultArray = process.env.NacosExternalListenAddr.split(',');
          
          // registry instance
          await client.registerInstance(process.env.NacosApplicationName, {
            ip: resultArray[0],
            port: resultArray[1],
          });

          Logger.info(`🔥 start nacos success....`);
    }
};

export default startNacos;
