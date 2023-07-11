import winston from 'winston';
import SentryTransport from 'winston-transport-sentry-node';

const Sentry = SentryTransport.default;

let logger = null;

/**
 * LoggerClass that maintains a singleton, and has straightforward methods to log any application events.
 * 
 */
export default class Logger {
    /**
     * @static
     * Create method must first be called before using the logger. It creates a singleton, which will then 
     * be referred to throughout the application. 
     * 
     * @param {LoggerConfig} config - Logger configuration to overwrite winston configs and define sentry + datadog endpoints.
     */
    static create(config) {
        if (!logger) {
            logger = winston.createLogger(Object.assign({
                format: winston.format.combine(
                    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
                    winston.format.colorize({
                        all: true,
                        colors: {
                            error: "red",
                            warn: "yellow",
                            info: "green",
                            debug: "white",
                        }
                    }),
                    winston.format.printf(
                        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
                    ),
                ),
                transports: [
                    new winston.transports.Console({
                        level: config.console?.level || "info"
                    }),
                    new Sentry(
                        {  
                            sentry: {
                                dsn: config.sentry?.dsn,
                                environment: config.sentry?.environment || "development"
                            },
                            level: config.sentry?.level || "error",
                        }
                    ),
                    new winston.transports.Http(
                        {
                            host: "http-intake.logs.datadoghq.com",
                            path: "/api/v2/logs?dd-api-key=" + config.datadog?.api_key + "&ddsource=nodejs&service=" + config.datadog?.service_name,
                            ssl: true
                        }
                    ),
                ]
            },
                config.winston
            ));
        }
    }

    /**
     * @static
     * Method to log for level - "info", this should not be called if it has been custom levels are 
     * set which does not include "info"
     * 
     * @param {*} message - String or object to log.
     */
    static info(message) {
        if (typeof message === "string") {
            logger?.info(message);
        } else {
            logger?.info(JSON.stringify(message));
        }
    }

    /**
     * @static
     * Method to log for level - "debug", this should not be called if it has been custom levels are 
     * set which does not include "debug"
     * 
     * @param {*} message - String or object to log.
     */
    static debug(message) {
        if (typeof message === "string") {
            logger?.debug(message);
        } else {
            logger?.debug(JSON.stringify(message));
        }
    }

    /**
     * @static
     * Method to log for level - "error", this should not be called if it has been custom levels are 
     * set which does not include "error"
     * 
     * @param {*} error - String or object to log.
     */
    static error(error) {
        if (typeof error === "string") {
            logger?.error(error);
        } else {
            logger?.error(
                `${(error).message ? `${(error).message} : ` : ""}${JSON.stringify(error)}`
            );
        }
    }

    /**
     * @static
     * Method to log for level - "warn", this should not be called if it has been custom levels are 
     * set which does not include "warn"
     * 
     * @param {*} message - String or object to log.
     */
    static warn(message) {
        if (typeof message === "string") {
            logger?.warn(message);
        } else {
            logger?.warn(JSON.stringify(message));
        }
    }

    /**
     * @static
     * Method to log for any level, which should be used to log all custom levels that may be added.
     * 
     * @param {string|object} message - String or object to log.
     */
    static log(level, message) {
        if (typeof message === "string") {
            logger?.log(level, message);
        } else {
            logger?.log(level, JSON.stringify(message));
        }
    }
}
