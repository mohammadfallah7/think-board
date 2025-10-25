import express from "express";
import noteRouter from "./routes/note-router.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
connectDB();

app.use("/api/notes", noteRouter);

const port = process.env.PORT || "5001";
app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});
