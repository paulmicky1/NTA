
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const dataPath = path.join(__dirname, '../data/notes.json');

function loadNotes() {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

function saveNotes(notes) {
  fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2));
}

exports.getNotes = (req, res) => {
  const notes = loadNotes();
  res.json(notes);
};

exports.createNote = (req, res) => {
  const notes = loadNotes();
  const newNote = { id: Date.now(), content: req.body.content };
  notes.push(newNote);
  saveNotes(notes);
  res.status(201).json(newNote);
};

exports.updateNote = (req, res) => {
  let notes = loadNotes();
  const index = notes.findIndex((note) => note.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Note not found');
  notes[index].content = req.body.content;
  saveNotes(notes);
  res.json(notes[index]);
};

exports.deleteNote = (req, res) => {
  let notes = loadNotes();
  notes = notes.filter((note) => note.id !== parseInt(req.params.id));
  saveNotes(notes);
  res.status(204).send();
};
    