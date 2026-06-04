const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: 'A record with this information already exists'
        });
    }

    if (err.isJoi) {
        return res.status(400).json({
            success: false,
            message: err.details?.[0]?.message || 'Validation error'
        });
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorMiddleware;
