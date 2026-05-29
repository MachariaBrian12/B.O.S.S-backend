"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
/**
 * ROUTES
 */
const ai_route_1 = __importDefault(require("../routes/ai.route"));
const app = (0, express_1.default)();
/**
 * =========================
 * MIDDLEWARE
 * =========================
 */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/**
 * =========================
 * HEALTH CHECK
 * =========================
 */
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'B.O.S.S Backend is running 🚀',
    });
});
/**
 * =========================
 * AI ROUTE (GURU AI CORE)
 * =========================
 */
app.use('/api/v1/ai', ai_route_1.default);
/**
 * =========================
 * FUTURE ROUTES PLACEHOLDER
 * =========================
 */
// app.use("/api/v1/mpesa", mpesaRoutes);
/**
 * =========================
 * START SERVER
 * =========================
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('==================================');
    console.log(`🚀 B.O.S.S SERVER RUNNING`);
    console.log(`📡 http://localhost:${PORT}`);
    console.log(`🧠 AI ROUTE: /api/v1/ai/chat`);
    console.log('==================================');
});
