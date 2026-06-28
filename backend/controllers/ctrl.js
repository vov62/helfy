import pool from "../db/mysql.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const login = async (req, res) => {
  console.log("🔥 LOGIN HIT");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "missing fields" });
    }

    // find user
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // check password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create token
    const token = uuidv4();

    // store token in database
    await pool.query("INSERT INTO user_tokens (user_id, token) VALUES (?, ?)", [
      user.id,
      token,
    ]);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
