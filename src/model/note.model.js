const mongoose = require("mongoose");

const note_Schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    status: { type: String, default: "Active" },
    images: [{ type: String, default:"" }],
    noteStatus: {
      type: String,
      default: "Pending",
      default: ["Pending", "Completed"],
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Note = new mongoose.model("Note", note_Schema);
module.exports = { Note };
