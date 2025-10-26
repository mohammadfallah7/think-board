import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middlewares/rate-limiter.js";
import noteRouter from "./routes/note-router.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(rateLimiter);

app.use("/api/notes", noteRouter);

connectDB().then(() => {
  const port = process.env.PORT || "5001";

  app.listen(port, () => {
    console.log(`Server started on PORT:${port}`);
  });
});
