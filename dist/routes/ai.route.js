"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guru_ai_1 = require("../ai/guru.ai");
const router = express_1.default.Router();
router.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const response = await (0, guru_ai_1.guruAI)(messages);
        res.json({
            success: true,
            data: response,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: 'AI engine failed',
        });
    }
});
exports.default = router;
