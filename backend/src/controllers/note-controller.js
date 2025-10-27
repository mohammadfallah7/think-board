import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const data = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "You got the notes successfully!", data });
  } catch (error) {
    console.error("Error in getAllNotes:", error);

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function getNote(req, res) {
  const id = req.params.id;

  try {
    const data = await Note.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "You got the note successfully!", data });
  } catch (error) {
    console.error("Error in getNote:", error);

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function createNote(req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const note = new Note({ title, content });
    const data = await note.save();

    res.status(201).json({ message: "You created a note successfully!", data });
  } catch (error) {
    console.error("Error in createNote:", error);

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function UpdateNote(req, res) {
  const { title, content } = req.body;
  const id = req.params.id;

  try {
    const data = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "You updated a note successfully!", data });
  } catch (error) {
    console.error("Error in updateNote:", error);

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function DeleteNote(req, res) {
  const id = req.params.id;

  try {
    const data = await Note.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "You deleted a note successfully!" });
  } catch (error) {
    console.error("Error in deleteNote:", error);

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
