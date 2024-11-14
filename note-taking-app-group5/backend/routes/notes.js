const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const jsonDir = path.join(__dirname, '../data/json');
const markdownDir = path.join(__dirname, '../data/markdown');

// Ensure data directories exist
fs.ensureDirSync(jsonDir);
fs.ensureDirSync(markdownDir);

// Create note
router.post('/', [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('content').not().isEmpty().withMessage('Content is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, title, content } = req.body;
    const note = { id, title, content, createdAt: new Date() };
    const jsonPath = path.join(jsonDir, `${id}.json`);
    const markdownPath = path.join(markdownDir, `${id}.md`);

    fs.writeJsonSync(jsonPath, note);
    fs.writeFileSync(markdownPath, `# ${title}\n\n${content}`);
    res.status(201).json({ message: 'Note created', note });
});

// Get all notes
router.get('/', (req, res) => {
    const files = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));
    const notes = files.map(file => fs.readJsonSync(path.join(jsonDir, file)));
    res.json(notes);
});

// Get note by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const jsonPath = path.join(jsonDir, `${id}.json`);
    if (fs.existsSync(jsonPath)) {
        const note = fs.readJsonSync(jsonPath);
        res.json(note);
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

// Update note
router.put('/:id', [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('content').not().isEmpty().withMessage('Content is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const { title, content } = req.body;
    const jsonPath = path.join(jsonDir, `${id}.json`);
    const markdownPath = path.join(markdownDir, `${id}.md`);

    if (fs.existsSync(jsonPath)) {
        const note = { id, title, content, updatedAt: new Date() };
        fs.writeJsonSync(jsonPath, note);
        fs.writeFileSync(markdownPath, `# ${title}\n\n${content}`);
        res.json({ message: 'Note updated', note });
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

// Delete note
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const jsonPath = path.join(jsonDir, `${id}.json`);
    const markdownPath = path.join(markdownDir, `${id}.md`);

    if (fs.existsSync(jsonPath)) {
        fs.removeSync(jsonPath);
        fs.removeSync(markdownPath);
        res.json({ message: 'Note deleted' });
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

module.exports = router;