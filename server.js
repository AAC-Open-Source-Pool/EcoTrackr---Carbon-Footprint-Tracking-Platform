import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import googleAuthRouter from "./routes/google.js";
import profileRoutes from "./routes/profile.js";
import carbonRoutes from "./routes/carbon.js";
import postsRoutes from "./routes/posts.js";
import eventsRoutes from "./routes/events.js";
import surveyRoutes from "./routes/survey.js";
import uploadsRoutes from "./routes/uploads.js";
import ngoRoutes from "./routes/ngo.js";
import productsRoutes from "./routes/products.js";
import rewardsRoutes from "./routes/rewards.js";
import rewardsNgoRoutes from "./routes/rewards-ngo.js";
import contactRoutes from "./routes/contact.js";
import registrationsRoutes from "./routes/registrations.js";
import quizzesRoutes from "./routes/quizzes.js";
import communityRoutes from "./routes/community.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS for React/Vite frontend (support 5173/5174 or env override)
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  "http://localhost:5174",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like curl or mobile apps
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin) || origin.startsWith('http://localhost:')) return callback(null, true);
      return callback(new Error(`CORS blocked from origin ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
// Serve static uploaded files
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

// ✅ MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecotrack';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/google", googleAuthRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/carbon", carbonRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/rewards", rewardsRoutes);
app.use("/api/rewards/ngo", rewardsNgoRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/registrations", registrationsRoutes);
app.use("/api/quizzes", quizzesRoutes);
app.use("/api/community", communityRoutes);

// ✅ Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
