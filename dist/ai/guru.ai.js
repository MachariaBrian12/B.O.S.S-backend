"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guruAI = guruAI;
async function guruAI(messages, context = {}) {
    const lastMessage = messages[messages.length - 1]?.content || '';
    console.log('🧠 Guru AI received:', lastMessage);
    /**
     * =========================
     * SIMPLE INTELLIGENCE LAYER (PHASE 1)
     * =========================
     */
    // 1. Greetings
    if (/hello|hi|hey/i.test(lastMessage)) {
        return {
            reply: 'Hello. Guru AI is active. How can I assist your system today?',
            type: 'text',
        };
    }
    // 2. System status
    if (/status|system/i.test(lastMessage)) {
        return {
            reply: 'B.O.S.S system is running. AI layer active. Payments disabled.',
            type: 'system',
        };
    }
    // 3. Basic intent: payment request
    if (/pay|payment|mpesa/i.test(lastMessage)) {
        return {
            reply: 'Payments module is currently disabled. It will be enabled later.',
            type: 'warning',
        };
    }
    // 4. Default AI fallback
    return {
        reply: `Guru AI received: "${lastMessage}". AI reasoning layer is not yet connected to LLM, but routing is active.`,
        type: 'text',
    };
}
