export const handleResponse = ({ res, data, statusCode }) => {
    res.status(statusCode || 200).json(data);
};

export const handleError = (error, next) => {
    next(error);
};
