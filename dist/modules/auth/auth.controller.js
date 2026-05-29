"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = registerController;
exports.loginController = loginController;
const auth_service_1 = require("./auth.service");
async function registerController(req, res) {
    const result = await (0, auth_service_1.register)(req.body.email, req.body.password, req.body.name);
    res.json({
        success: true,
        message: 'User registered',
        data: result,
    });
}
async function loginController(req, res) {
    const result = await (0, auth_service_1.login)(req.body.email, req.body.password);
    res.json({
        success: true,
        message: 'Login successful',
        data: result,
    });
}
