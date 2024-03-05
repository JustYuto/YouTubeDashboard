// backend/src/utils/errorHandler.js

// Not Found Error Handler
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// General Error Handler
const errorHandler = (err, req, res, next) => {
    // Determine the status code: if the response already has a status code set (which might be 200), use it; otherwise, use 500.
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        status: statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🍪' : err.stack, // Hide the stack trace in production mode
    });
};

module.exports = {
    notFound,
    errorHandler,
};
