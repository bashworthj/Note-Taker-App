const fs = require('fs');
const path = require('path');
const notes = require('../db/notes.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
