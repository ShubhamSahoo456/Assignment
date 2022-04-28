const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
