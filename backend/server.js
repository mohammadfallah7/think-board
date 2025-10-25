import express from "express";

const app = express();

app.get("/api/notes", (req, res) => {
  res.status(200).json({ message: "You got the notes successfully!" });
});
app.post("/api/notes", (req, res) => {
  res.status(201).json({ message: "You created a note successfully!" });
});
app.put("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "You updated a note successfully!" });
});
app.delete("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "You deleted a note successfully!" });
});

app.listen(5001, () => {
  console.log("Server started on port: 5001");
});
