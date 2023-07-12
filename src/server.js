import { config } from 'dotenv';
import path from 'path';
import cors from 'cors';
import express from 'express';
import Logger from './helpers/logger.js';
import url from 'url';
import helmet from 'helmet';
import healthCheckRoute from './routes/healthCheck.js';
import posRoutes from './routes/pos.js';
import zkevmRoute from './routes/zkevm.js';
import { errorHandlerMiddleware } from './middleware/errorHandler.js';
import { verifyUrl } from "./middleware/verifyUrl.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, ".env"), silent: true });
Logger.create({
    sentry: {
        dsn: process.env.SENTRY_DSN,
        level: 'error'
    },
    datadog: {
        api_key: process.env.DATADOG_API_KEY,
        service_name: process.env.DATADOG_APP_KEY
    }
});

const app = express();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 7000;

app.use(cors());
app.use(helmet());
app.use(verifyUrl);

app.use('/health-check', healthCheckRoute);
app.use('/pos', posRoutes);
app.use('/zkevm', zkevmRoute);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use(errorHandlerMiddleware);

const startApi = () => {
    app.listen(port, () => {
        Logger.info(`🔥 Listening at http://${host}:${port}`);
    });
};

export default startApi;
