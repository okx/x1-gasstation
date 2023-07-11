import Logger from "./logger.js";
import { isHandledError } from "../utils/isHandledError.js";

export default {};
export const handleResponse = ({ res, data, statusCode, success = true }) => {
  res.status(statusCode || 200).json({
    success,
    data,
  });
};

export const handleError = ({ res, statusCode, data, success = false }) => {
  res.status(statusCode || 500).send({
    success,
    data,
  });
};

export const unAuthorized = (res) => {
  res.status(401).send({
    success: false,
    data: { message: "Unauthorized! you're not authorized for this route!" },
  });
};

export const returnError = (error, next) => {
  if (isHandledError(error)) {
    Logger.warn(error);
  } else {
    Logger.error(error);
  }
  next(error);
};