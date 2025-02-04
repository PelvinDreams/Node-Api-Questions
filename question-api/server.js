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

// CORS(cross origin resource sharing) Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,  // Explicitly enable TLS/SSL
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});


// Default Route ( just to fix for 404 error)
app.get('/', (req, res) => {
  res.send("Welcome to the API!");
});

// Routes
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/moderator', moderatorRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
