import express from "express";
import {
  createNote,
  DeleteNote,
  getAllNotes,
  UpdateNote,
} from "../controllers/note-controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", UpdateNote);
router.delete("/:id", DeleteNote);

export default router;
