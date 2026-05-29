import express from 'express';
import { guruAI } from '../ai/guru.ai';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await guruAI(messages);

    res.json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'AI engine failed',
    });
  }
});

export default router;
