import express from "express";
import Community from "../models/Community.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// List posts
router.get("/", async (req,res)=>{
  const posts = await Community.find().populate("user", "username");
  res.json(posts);
});

// Add post
router.post("/", auth, async (req,res)=>{
  const post = new Community({ ...req.body, user: req.userData._id });
  await post.save();
  res.json(post);
});

export default router;
