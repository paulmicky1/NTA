const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();
const jsonDir = path.join(__dirname, '../data/json');
const markdownDir = path.join(__dirname, '../data/markdown');

fs.ensureDirSync(jsonDir);
fs.ensureDirSync(markdownDir);

router.get('/', (req, res) => {
    const files = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));
    const notes = files.map(file => fs.readJsonSync(path.join(jsonDir, file)));
    res.json(notes);
});

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

router.post('/', (req, res) => {
    const { id, title, content } = req.body;
    const jsonPath = path.join(jsonDir, `${id}.json`);
    const markdownPath = path.join(markdownDir, `${id}.md`);

    const note = { id, title, content, createdAt: new Date() };

    fs.writeJsonSync(jsonPath, note);
    fs.writeFileSync(markdownPath, `# ${title}\n\n${content}`);

    res.status(201).json({ message: 'Note created', note });
});

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