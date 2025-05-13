import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

// Allow specific origins for CORS
const allowedOrigins = ['http://localhost']; 
// or just: origin: 'http://localhost' 
app.use(cors({ origin: allowedOrigins, credentials: true }));


app.use(express.json());

// Routes for authentication (signup, login)
app.use('/api/auth', authRoutes);

// MongoDB Connection
console.log('Connecting to MongoDB at', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,   // Ensures you are using the new connection string parser
  useUnifiedTopology: true // Ensures you are using the new Server Discovery and Monitoring engine
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));
