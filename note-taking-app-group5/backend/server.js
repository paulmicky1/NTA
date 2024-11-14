const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const noteRoutes = require('./routes/notes');

const app = express();
const PORT = 3000;

// Middleware
app.use(helmet());  // Security headers
app.use(cors());  // Enable CORS
app.use(bodyParser.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});