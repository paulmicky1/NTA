
const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../services/notesService');
const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
    