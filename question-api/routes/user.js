import express from "express";
import auth from "../middleware/auth.js";
import Question from "../models/Question.js";

const router = express.Router(); // Initialize router first

// User asks a question
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
