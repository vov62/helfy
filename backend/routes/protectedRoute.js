import express from "express";
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "you are authenticated",
    userId: req.userId,
  });
});

export default router;
