import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

// Allow only localhost or other domains you trust
const allowedOrigins = ['http://localhost'];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

export default app;

// Connect to MongoDB and start server (except during test)
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));
    })
    .catch(err => console.error('DB connection error:', err));
}
