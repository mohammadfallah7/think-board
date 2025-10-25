export async function getAllNotes(req, res) {
  res.status(200).json({ message: "You got the notes successfully!" });
}

export async function createNote(req, res) {
  res.status(201).json({ message: "You created a note successfully!" });
}

export async function UpdateNote(req, res) {
  res.status(200).json({ message: "You updated a note successfully!" });
}

export async function DeleteNote(req, res) {
  res.status(200).json({ message: "You deleted a note successfully!" });
}
