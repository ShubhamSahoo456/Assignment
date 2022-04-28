const Note = require("../models/notesModel");

const getAllUserNotes = async (req, res) => {
  try {
    const { _id } = req.user;
    const notes = await Note.find({ userId: _id });
    if (notes) {
      res.status(200).json({ status: true, notes });
    } else {
      res.status(403).json({ status: false, message: "Not authorized" });
    }
  } catch (error) {
    console.log(error);
  }
};

const createUserNote = async (req, res) => {
  try {
    const { _id } = req.user;
    const newNote = await Note.create({ userId: _id, note: req.body.note });
    if (newNote) {
      res.status(200).json({ status: true, note: newNote });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUserNote = async (req, res) => {
  console.log(req.params.id);
  try {
    const deleteNote = await Note.findOneAndDelete({ _id: req.params.id });
    if (deleteNote) {
      res
        .status(200)
        .json({ status: true, message: "Npte deleted successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUserNotes,
  createUserNote,
  deleteUserNote,
};
