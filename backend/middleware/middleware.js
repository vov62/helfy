import pool from "../db/mysql.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Bearer token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // בדיקה מול DB
    const [rows] = await pool.query(
      "SELECT * FROM user_tokens WHERE token = ?",
      [token],
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // לשים userId ב-request
    req.userId = rows[0].user_id;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
