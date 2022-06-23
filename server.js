const fs = require('fs');
const path = require('path');
const notepage = require('./db/notes.json');
const express = require('express');
const uuid = require('uuid');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET * should return the index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  res.json(notepage)
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
//  You'll need to find a way to give each note a unique id when it's saved

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid,
    };
    notepage.push(newNote);
    const noteStr = JSON.stringify((notepage), null, 2)
    fs.writeFile('./db/notes.json', noteStr, () => {
      const response = {
        body: newNote,
      };
  
      res.json(response);
    })
  
}});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
