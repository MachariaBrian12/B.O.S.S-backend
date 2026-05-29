"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = success;
exports.fail = fail;
function success(data, message = 'OK') {
    return {
        success: true,
        message,
        data,
        error: null,
    };
}
function fail(message = 'Error', data = null) {
    return {
        success: false,
        message,
        data,
        error: message,
    };
}
