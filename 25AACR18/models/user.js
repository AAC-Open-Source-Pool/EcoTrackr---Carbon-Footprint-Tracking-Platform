import mongoose from "mongoose";

// Schema for Eco Goals
const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  progress: { type: Number, default: 0 }
});

// Schema for Activities
const activitySchema = new mongoose.Schema({
  type: { type: String, enum: ["action", "event", "quiz"], required: true },
  description: { type: String, required: true },
  points: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

// Schema for Stats
const statsSchema = new mongoose.Schema({
  totalPoints: { type: Number, default: 0 },
  actionCount: { type: Number, default: 0 },
  eventsAttended: { type: Number, default: 0 },
  quizzesCompleted: { type: Number, default: 0 }
});

// Main User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["user", "admin"], default: "user" },
  profilePicture: { type: String, default: "" },
  location: { type: String, default: "" },
  bio:      { type: String, default: "" },

  ecoGoals:   { type: [goalSchema], default: () => [] },
  activities: { type: [activitySchema], default: () => [] },
  stats:      { type: statsSchema, default: () => ({}) },
  points:     { type: Number, default: 0 }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
