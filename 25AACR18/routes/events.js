import express from "express";
import Event from "../models/Event.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all events
router.get("/", async (req,res)=>{
  const events = await Event.find();
  res.json(events);
});

// Create new event
router.post("/", auth, async (req,res)=>{
  const { title, description, date } = req.body;
  const event = new Event({ title, description, date });
  await event.save();
  res.json(event);
});

// Join an event
router.post("/:id/join", auth, async (req,res)=>{
  const event = await Event.findById(req.params.id);
  if(!event) return res.status(404).json({ message: "Event not found" });
  if(!event.participants.includes(req.userData._id)){
    event.participants.push(req.userData._id);
    await event.save();
  }
  res.json(event);
});

export default router;
