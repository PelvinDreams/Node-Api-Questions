import express from 'express';
import route from './routes/user.js';
import auth from './middleware/auth.js';
import Question from './models/Question.js';

// User ask a question
router.post("/ask", auth(["user"]), async (req, res) => {
    const { question } = req.body;
  
    try {
      const newQuestion = new Question({
        question,
        askedBy: req.user._id,
      });
  
      await newQuestion.save();
      res.status(201).json(newQuestion);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

 export default router;