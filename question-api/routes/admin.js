import express from 'express';
import Question from '../models/Question.js';
import auth from '../middleware/auth.js';
import router from './admin.js';

// admin views all questions
router.get("/questions", auth(["admin"]), async (req, res) => {
    try {
        const questions = await Question.find().populate('askedBy', 'username');
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// admin approves a question or rejcets it
router.put("/questions/:id", auth(["admin"]), async (req, res) => {
    const { status } = req.body;

    try {
        const question = await Question.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;