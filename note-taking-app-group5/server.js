const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Directories for storing notes
const jsonDir = path.join(__dirname, 'data/json');
const markdownDir = path.join(__dirname, 'data/markdown');

// Ensure directories exist
fs.ensureDirSync(jsonDir);
fs.ensureDirSync(markdownDir);

// Routes
app.get('/notes', (req, res) => {
    const files = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));
    const notes = files.map(file => fs.readJsonSync(path.join(jsonDir, file)));
    res.json(notes);
});

app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const jsonPath = path.join(jsonDir, `${id}.json`);
    if (fs.existsSync(jsonPath)) {
        const note = fs.readJsonSync(jsonPath);
        res.json(note);
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

app.post('/notes', (req, res) => {
    const { id, title, content } = req.body;
    const jsonPath = path.join(jsonDir, `${id}.json`);
    const markdownPath = path.join(markdownDir, `${id}.md`);

    const note = { id, title, content, createdAt: new Date() };

    fs.writeJsonSync(jsonPath, note);
    fs.writeFileSync(markdownPath, `# ${title}\n\n${content}`);

    res.status(201).json({ message: 'Note created', note });
});

app.delete('/notes/:id', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});