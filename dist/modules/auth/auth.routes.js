"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_1 = require("../shared/validate");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
/**
 * AUTH ROUTES (WITH VALIDATION)
 */
router.post('/register', (0, validate_1.validate)(auth_validation_1.registerSchema), auth_controller_1.registerController);
router.post('/login', (0, validate_1.validate)(auth_validation_1.loginSchema), auth_controller_1.loginController);
exports.default = router;
