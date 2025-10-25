import express from "express";
import noteRouter from "./routes/note-router.js";

const app = express();

app.use("/api/notes", noteRouter);

app.listen(5001, () => {
  console.log("Server started on port: 5001");
});
