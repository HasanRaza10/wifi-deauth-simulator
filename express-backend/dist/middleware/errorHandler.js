"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    const code = error.code || 'INTERNAL_ERROR';
    res.status(statusCode).json({
        code,
        message,
        details: error.details,
        timestamp: new Date().toISOString(),
        path: req.path,
    });
};
exports.errorHandler = errorHandler;
const createError = (message, statusCode = 500, code = 'INTERNAL_ERROR', details) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.code = code;
    error.details = details;
    return error;
};
exports.createError = createError;
//# sourceMappingURL=errorHandler.js.map