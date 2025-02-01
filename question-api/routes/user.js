import express from 'express';
import route from './routes/user.js';
import auth from './middleware/auth.js';
import Question from './models/Question.js';