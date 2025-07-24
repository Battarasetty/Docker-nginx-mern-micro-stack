import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

// ✅ Update this to include your deployed frontend domain
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost', 
  'https://frontend-ofb0.onrender.com' // <-- add this
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

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
