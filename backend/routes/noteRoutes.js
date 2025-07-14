import express from 'express';
import { createNotes, getNotes, updateNotes } from '../controllers/notesController.js';

const router = express.Router();

// POST /note - create note
router.post('/note',createNotes );

// GET /note - get all notes
router.get('/note', getNotes);

// PUT /note/:id - update a note
router.put('/note/:id', updateNotes);

export default router;
