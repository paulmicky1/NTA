# Node.js Note-Taking App

This is a simple note-taking app built with Node.js that stores notes as JSON files and Markdown files.

## Setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. The app will be running at `http://localhost:3000`.

## API Routes

- `GET /notes`: Retrieve all notes.
- `GET /notes/:id`: Retrieve a single note by ID.
- `POST /notes`: Create a new note.
- `DELETE /notes/:id`: Delete a note by ID.

## Data Storage

Notes are stored in the `data/json` and `data/markdown` directories as `.json` and `.md` files, respectively.
