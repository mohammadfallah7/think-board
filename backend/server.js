import express from "express";
import noteRouter from "./routes/note.js";

const app = express();

app.use("/api/notes", noteRouter);

app.listen(5001, () => {
  console.log("Server started on port: 5001");
});
