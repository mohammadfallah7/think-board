import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "You got the notes successfully!" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "You created a note successfully!" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "You updated a note successfully!" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "You deleted a note successfully!" });
});

export default router;
