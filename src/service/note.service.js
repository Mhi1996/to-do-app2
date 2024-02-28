const objectId = require("mongoose").ObjectId;
const { mongo } = require("mongoose");
const { Note } = require("../model/note.model");

const createNote = async function (req, res) {
  try {
    let { title, description, userId, images, noteStatus } = req.body;
    let saveNote = await Note.create({
      title: title,
      description: description,
      images: images,
      noteStatus: noteStatus,
      userId: userId,
    });
    if (!saveNote) return "Note not added";
    return saveNote;
  } catch (error) {
    throw error;
  }
};

const getNoteById = async (req) => {
  try {
    const id = req.params.id;
    const res = await Note.findById({ _id: id, status: "Active" });
    console.log(`res===== ${JSON.stringify(res)}`);
    if (!res) return "Note not found";
    return res;
  } catch (error) {
    throw error;
  }
};
// update note and update note status api
const updateNoteById = async (req) => {
  try {
    const data = req.body;
    const res = await Note.findOneAndUpdate(
      { _id: data.id, status: "Active" },
      {
        title: data.title,
        description: data.description,
        noteStatus: data.noteStatus,
        userId: data.userId,
      },
      { new: true }
    );
    if (!res) return "Note not found";
    console.log(`data updated ${res}`);
    return res;
  } catch (error) {
    throw error;
  }
};

const deleteNoteById = async (req) => {
  try {
    const id = req.params.id;
    const res = await Note.findByIdAndDelete({ _id: id, status: "Active" });
    if (!res) return "Note not found";
    return res;
  } catch (error) {
    throw error;
  }
};

const allNoteByUserId = async (req) => {
  try {
    console.log(`before id = == ${req.params.id}`);
    const id = objectId(req.params.id); //User Id
    console.log(`after id = == ${id}`);
    const noteStatus = req.query.noteStatus; //note status

    const res = await Note.find({
      $where: { userId: id, noteStatus: noteStatus, status: "Active" },
    });
    console.log(`res====== ${JSON.stringify(res)}`);
    ///find({ userId: id, status: "Active", });
    if (!res) return "Note not found";
    return res;
  } catch (error) {
    throw error;
  }
};

const getAllNotes = async () => {
  try {
    const res = await Note.find();
    console.log(`all note=== ${JSON.stringify(res)} `);
    if (!res) return "Note not found";
    return res;
  } catch (error) {
    throw error;
  }
};

const notesFilter = async (req, res) => {
  try {
    const res1 = await Note.aggregate([
      { $match: { title: req.body.title, status: "Active" } },
    ]);
    console.log(`filter note=== ${JSON.stringify(res1)} `);
    if (!res1) res.status(500).send({ msg: "Note not found" }); //return "Note not found";
    res.status(200).send({ resullt: res1 });
  } catch (error) {
    res.status(500).send({ err: error });
    //throw error;
  }
};

module.exports = {
  createNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
  allNoteByUserId,
  getAllNotes,
  notesFilter,
};
