import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();
const app = express();

const allowedOrigins = ['http://localhost']; 

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

app.use('/api/profile', profileRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('DB connection error:', err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Profile server running on port ${PORT}`));
