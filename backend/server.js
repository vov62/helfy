import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbPool from "./db/mysql.js";
import routes from "./routes/routes.js";
import protectedRoutes from "./routes/protectedRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", routes);
app.use("/api/protected", protectedRoutes);

async function testConnection() {
  try {
    const connection = await dbPool.getConnection();
    console.log("connected to  mysql successfully!");
    connection.release();
  } catch (error) {
    console.error("failed to connect to mysql db");
    console.error(error.message);
  }
}

testConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
