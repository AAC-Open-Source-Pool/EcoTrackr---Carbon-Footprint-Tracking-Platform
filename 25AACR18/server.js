import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import googleAuthRouter from "./routes/google.js";
import profileRoutes from "./routes/profile.js";
import carbonRoutes from "./routes/carbon.js";
import postsRoutes from "./routes/posts.js";
import surveyRoutes from "./routes/survey.js"; // ✅ NEW import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(express.json());

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
app.use("/api/surveys", surveyRoutes); // ✅ NEW route registration

// ✅ Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

