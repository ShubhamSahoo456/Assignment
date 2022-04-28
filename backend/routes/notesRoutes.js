const express = require("express");
const tokenVerification = require("../auth/authToken");
const {
  getAllUserNotes,
  createUserNote,
  deleteUserNote,
} = require("../controller/notesController");

const router = express.Router();

router.get("/getUserNotes", tokenVerification, getAllUserNotes);

router.post("/createNote", tokenVerification, createUserNote);

router.delete("/deleteNote/:id", tokenVerification, deleteUserNote);

module.exports = router;
