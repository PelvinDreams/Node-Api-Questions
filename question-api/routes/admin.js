import express from "express";
import auth from "../middleware/auth.js";

import Question from "../models/Question.js";


const router = express.Router(); // Initialize router first

// Admin views all questions
router.get("/questions", auth(["admin"]), async (req, res) => {
  try {
    const questions = await Question.find().populate("askedBy", "username");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin deletes a question
router.delete("/questions/:id", auth(["admin"]), async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin approves or rejects a question
router.put("/questions/:id", auth(["admin"]), async (req, res) => {
  const { status } = req.body;

  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;