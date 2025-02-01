import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    askedBy: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    isRead: { type: Boolean, default: false },
    createdBy: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', questionSchema);