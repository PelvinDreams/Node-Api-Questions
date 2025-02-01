import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { text } from 'body-parser';
import { read } from 'fs';
 
const app = express();

dotenv.config();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Question Model or Schema
const questionSchema = new mongoose.Schema({
    text: String,
    user: String,
    approved: { type: Boolean, default: false },
    read : { type: Boolean, default: false }
  });

const Question = mongoose.model('Question', questionSchema);

// Middleware for authentication
const authentication = (role) => (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).send({message: 'Access Denied'});
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (role && role !== verified.role) return res.status(403).send({message: 'Access Denied'});
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({message: 'Invalid Token'});
    }
};