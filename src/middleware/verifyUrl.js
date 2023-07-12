export const verifyUrl = async(req, res, next) => {
    try {
        const { query } = req;
        if (Object.keys(query).length > 0) {
            const error = new Error('Query not allowed');
            error.statusCode = 400;
            next(error);
        } else {
            next();
        }
    } catch(e) {
        next(e);
    }
}
