import Note from "../models/NotesModel.js";

export const getNotes = async (req, res) => {
    try {
      const notes = await Note.find().sort({ createdAt: -1 });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

export const createNotes = async (req, res) => {
  console.log('inside note')
    try {
      const { title, content } = req.body;
      const note = await Note.create({ title, content });
      res.status(201).json(note);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  export const updateNotes = async (req, res) => {
    try {
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      res.json(updatedNote);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }