import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import noteRouter from "./routes/note-router.js";

const app = express();

dotenv.config();
connectDB();

app.use("/api/notes", noteRouter);

const port = process.env.PORT || "5001";
app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});
