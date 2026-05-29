"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const app_error_1 = require("./app.error");
function errorHandler(err, req, res, next) {
    console.error('🔥 ERROR:', err);
    const statusCode = err.statusCode || 500;
    const isOperational = err instanceof app_error_1.AppError;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: isOperational ? 'OPERATIONAL_ERROR' : 'SYSTEM_ERROR',
        data: null,
    });
}
