const fs = require('fs');
const chalk = require('chalk');

const getNotes = function() {
  return 'Your notes...';
};

const addNote = function(title, body) {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(function(note) {
    // Checks to see if title already exists,
    return note.title === title;
  });
  // If no duplicates, create/save note
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
    // If duplicate exists, do not create/save note
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

const removeNote = function(title) {
  const notes = loadNotes();

  var filteredNotes = notes.filter(function(note) {
    return note.title !== title;
  });

  if (notes.length > filteredNotes.length) {
    console.log(chalk.green.inverse('Note has been deleted'));
    saveNotes(filteredNotes);
  } else {
    console.log(chalk.red.inverse('Note does not exist'));
  }
};

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};
