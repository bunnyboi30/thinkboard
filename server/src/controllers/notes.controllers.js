import Note from "../models/notes.models.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error to get all notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteByID(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Could not find note" });

    res.status(200).json({ note });
  } catch (error) {
    console.log("Error to get notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    const savedNote = await newNote.save();
    res.status(201).json({ message: "Note Created", savedNote });
  } catch (error) {
    console.log("Error in creating notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { returnDocument: "after" },
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note was not found" });

    res.status(200).json({ message: "Note updated", updatedNote });
  } catch (error) {
    console.log("Error in updating notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note is not found." });

    res.status(200).json({ message: "Note is deleted!", deletedNote });
  } catch (error) {
    console.log("Error in deleting notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
