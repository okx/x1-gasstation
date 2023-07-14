export const handleResponse = ({ res, data, statusCode, success = true }) => {
  res.status(statusCode || 200).json({
    success,
    data,
  });
};

export const handleError = (error, next) => {
  next(error);
}
