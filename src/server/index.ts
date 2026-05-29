import 'dotenv/config';
import express from 'express';
import cors from 'cors';

/**
 * ROUTES
 */
import aiRoute from '../routes/ai.route';

const app = express();

/**
 * =========================
 * MIDDLEWARE
 * =========================
 */
app.use(cors());
app.use(express.json());

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
app.use('/api/v1/ai', aiRoute);

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
