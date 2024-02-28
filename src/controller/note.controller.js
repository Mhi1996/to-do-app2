const noteService = require("./../service/note.service");

const createNote = async (req, res) => {
  return noteService.createNote(req);
};

const getNoteById = async (req, res) => {
  return noteService.getNoteById(req);
};

const updateNoteById = async (req, res) => {
  return noteService.updateNoteById(req);
};

const deleteNoteById = async (req, res) => {
  return noteService.deleteNoteById(req);
};

const allNoteByUserId = async (req, res) => {
  return noteService.allNoteByUserId(req);
};

const getAllNotes = async (req, res) => {
  return noteService.getAllNotes(req);
};

const notesFilter = async (req, res) => {
  return noteService.notesFilter(req, res);
};

module.exports = {
  getNoteById,
  createNote,
  updateNoteById,
  deleteNoteById,
  allNoteByUserId,
  getAllNotes,
  notesFilter,
};
