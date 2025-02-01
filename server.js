import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import moderatorRouter from './routes/moderator.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() =>
     console.log("Connected to MongoDB")).catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/moderator', moderatorRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
