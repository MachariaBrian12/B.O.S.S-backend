"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../shared/jwt");
const app_error_1 = require("../shared/app.error");
const auth_repository_1 = require("./auth.repository");
/**
 * REGISTER USER
 */
async function register(email, password, name) {
    const existing = await auth_repository_1.UserRepository.findByEmail(email);
    if (existing) {
        throw new app_error_1.AppError('User already exists', 409);
    }
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await auth_repository_1.UserRepository.create({
        email,
        password: hashed,
        name,
        role: 'user',
    });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };
}
/**
 * LOGIN USER
 */
async function login(email, password) {
    const user = await auth_repository_1.UserRepository.findByEmail(email);
    if (!user) {
        throw new app_error_1.AppError('Invalid credentials', 401);
    }
    const valid = await bcryptjs_1.default.compare(password, user.password);
    if (!valid) {
        throw new app_error_1.AppError('Invalid credentials', 401);
    }
    const token = (0, jwt_1.signToken)({
        id: user.id,
        email: user.email,
        role: user.role,
    });
    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        token,
    };
}
