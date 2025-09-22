import express from "express";
import Event from "../models/Event.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all events
router.get("/", async (req,res)=>{
  const events = await Event.find();
  res.json(events);
});

// Create new event (organiser)
router.post("/", auth, async (req,res)=>{
  try {
    const {
      title,
      description,
      details,
      category,
      date,
      time,
      location,
      capacity,
      points,
      organizer,
      image,
    } = req.body;

    const event = new Event({
      title,
      description,
      details,
      category,
      date,
      time,
      location,
      capacity,
      points,
      organizer,
      image,
      createdBy: req.userData._id,
    });
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid event payload" });
  }
});

// Join an event
router.post("/:id/join", auth, async (req,res)=>{
  const event = await Event.findById(req.params.id);
  if(!event) return res.status(404).json({ message: "Event not found" });
  const userId = String(req.userData._id);
  const already = event.participants.some(p => String(p) === userId);
  if (already) return res.status(400).json({ message: "You have already registered" });

  // Capacity enforcement if capacity > 0
  const capacity = Number(event.capacity) || 0;
  const count = event.participants.length;
  if (capacity > 0 && count >= capacity) {
    return res.status(400).json({ message: "Event is full" });
  }

  event.participants.push(req.userData._id);
  await event.save();
  res.json(event);
});

// Prune previous events for the organiser, keeping only the most recent
router.delete("/mine/prune", auth, async (req, res) => {
  try {
    const organiserId = req.userData._id;
    const mine = await Event.find({ createdBy: organiserId }).sort({ createdAt: -1 });
    if (!mine || mine.length === 0) return res.json({ deleted: 0, kept: null });
    if (mine.length === 1) return res.json({ deleted: 0, kept: mine[0] });

    const toDelete = mine.slice(1).map((e) => e._id);
    const delRes = await Event.deleteMany({ _id: { $in: toDelete } });
    return res.json({ deleted: delRes.deletedCount || toDelete.length, kept: mine[0] });
  } catch (err) {
    console.error("Prune error:", err);
    res.status(500).json({ message: "Failed to prune events" });
  }
});

export default router;
