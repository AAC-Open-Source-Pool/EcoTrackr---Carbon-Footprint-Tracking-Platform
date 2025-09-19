import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware: verify token + fetch user
export default async function auth(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Attach full user object for route use
    req.userData = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
}
