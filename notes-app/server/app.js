
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');
const { authenticate } = require('./middlewares/auth');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/notes', authenticate, notesRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    