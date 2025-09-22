import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  details: { type: String },
  category: { type: String, default: "community" },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String },
  capacity: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  organizer: { type: String },
  image: { type: String }, // emoji or URL
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Event", EventSchema);
