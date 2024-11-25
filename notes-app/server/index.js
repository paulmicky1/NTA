const express = require('express');
const asyncHandler = require('express-async-handler');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors'); // Import CORS middleware

// Initialize app and port
const app = express();
const PORT = 3000;
const NOTES_FILE = path.join(__dirname, 'notes.json');

// Middleware for JSON parsing
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Helper function to read and write notes
const readNotes = async () => {
    try {
        const data = await fs.readFile(NOTES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(NOTES_FILE, JSON.stringify([]));
            return [];
        }
        throw error;
    }
};

const writeNotes = async (notes) => {
    await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
};

// Routes for Notes CRUD
const notesRouter = express.Router();

// GET all notes
notesRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const notes = await readNotes();
        res.json(notes);
    })
);

// GET a single note by ID
notesRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const notes = await readNotes();
        const note = notes.find((n) => n.id === req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    })
);

// POST a new note
notesRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }
        const notes = await readNotes();
        const newNote = { id: Date.now().toString(), title, content };
        notes.push(newNote);
        await writeNotes(notes);
        res.status(201).json(newNote);
    })
);

// PUT to update a note by ID
notesRouter.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const { title, content } = req.body;
        const notes = await readNotes();
        const noteIndex = notes.findIndex((n) => n.id === req.params.id);
        if (noteIndex === -1) {
            return res.status(404).json({ message: 'Note not found' });
        }
        const updatedNote = { ...notes[noteIndex], title, content };
        notes[noteIndex] = updatedNote;
        await writeNotes(notes);
        res.json(updatedNote);
    })
);

// DELETE a note by ID
notesRouter.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const notes = await readNotes();
        const filteredNotes = notes.filter((n) => n.id !== req.params.id);
        if (notes.length === filteredNotes.length) {
            return res.status(404).json({ message: 'Note not found' });
        }
        await writeNotes(filteredNotes);
        res.status(204).send(); // No content
    })
);

// Use the notes router for the "/notes" resource
app.use('/notes', notesRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//localhost:3000/notes/123 => method: delete