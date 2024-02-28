const express = require("express");
const route = express.Router();
const noteController = require("./../controller/note.controller");

route.post("/create", noteController.createNote);
route.get("/getById/:id", noteController.getNoteById);
route.patch("/updateById", noteController.updateNoteById);
route.delete("/deleteById/:id", noteController.deleteNoteById);
route.get("/allNoteGetByUserId/:id", noteController.allNoteByUserId);
route.get("/getAllNote", noteController.getAllNotes);
route.get("/filterByTitle",(req,res)=>{ noteController.notesFilter(req,res)});


module.exports = route;
