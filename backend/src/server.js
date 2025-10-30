import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middlewares/rate-limiter.js";
import noteRouter from "./routes/note-router.js";

const __dirname = path.resolve();
dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  const port = process.env.PORT || "5001";

  app.listen(port, () => {
    console.log(`Server started on PORT:${port}`);
  });
});
