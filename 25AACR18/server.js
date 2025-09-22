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
import surveyRoutes from "./routes/survey.js"; // ✅ NEW import
import uploadsRoutes from "./routes/uploads.js";
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
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked from origin ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
// Serve static uploaded files
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/google", googleAuthRouter);
app.use("/api/profile", profileRoutes);
app.use("/carbon", carbonRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/surveys", surveyRoutes); // ✅ NEW route registration
app.use("/api/uploads", uploadsRoutes);

// ✅ Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

