import createError from 'http-errors';
/*
//error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internet server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});*/

export const errorHandler = (statusCode, message) => {
    throw createError(statusCode, message);
};