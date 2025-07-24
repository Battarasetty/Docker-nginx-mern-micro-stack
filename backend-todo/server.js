// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import todoRoutes from './routes/todos.js';

dotenv.config();
const app = express();

// Allow specific origins for CORS
const allowedOrigins = ['http://localhost'];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

export default app; // 👈 Export app for testing

// Connect DB & start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      const PORT = process.env.PORT || 5001;
      app.listen(PORT, () => console.log(`Todo server running on port ${PORT}`));
    })
    .catch(err => console.error('DB connection error:', err));
}
