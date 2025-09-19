import express from "express";
import Quiz from "../models/Quiz.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// List quizzes
router.get("/", async (req,res)=>{
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// Add quiz
router.post("/", auth, async (req,res)=>{
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.json(quiz);
});

export default router;
