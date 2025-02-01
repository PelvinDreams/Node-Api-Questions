import express from 'express';
import Question from '../models/Question.js';
import auth from '../middleware/auth.js';
import router from './admin.js';

// Moderator views all or single question
router.get("/questions/:id", auth(["moderator"]), async (req, res) => {
    try {
      const question = await Question.findById(req.params.id).populate("askedBy", "username");
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  
  // Moderator marks a question as read
router.put("/questions/:id/mark-as-read", auth(["moderator"]), async (req, res) => {
    try {
      const question = await Question.findByIdAndUpdate(
        req.params.id,
        { isRead: true },
        { new: true }
      );
      res.json(question);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  export default router;