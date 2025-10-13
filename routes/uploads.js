import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.resolve(process.cwd(), "uploads");
try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch {}

// POST /api/uploads
// body: { data: string (base64 or dataURL), filename?: string }
router.post("/", async (req, res) => {
  try {
    const { data, filename } = req.body || {};
    if (!data) return res.status(400).json({ message: "Missing data" });

    let base64 = data;
    const match = /^data:(.*?);base64,(.*)$/.exec(data);
    if (match) {
      base64 = match[2];
    }

    const buffer = Buffer.from(base64, "base64");
    const safeName = (filename || `upload_${Date.now()}.png`).replace(/[^a-zA-Z0-9_.-]/g, "_");
    const target = path.join(uploadsDir, safeName);
    fs.writeFileSync(target, buffer);

    const urlPath = `/uploads/${safeName}`;
    res.json({ url: urlPath });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

export default router;
