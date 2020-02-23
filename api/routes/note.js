const express = require("express");
const SSE = require("express-sse");
const mongoose = require("mongoose");
const router = express.Router();

const authenticate = require("../middleware/auth");

const Note = require("../models/note");
const User = require("../models/user");

//get all notes as array
router.get("/", authenticate(), (req, res) => {
  const { _id } = req.user;
  Note.find({ user_id: _id })
    .exec()
    .then(notes => {
      res.status(200).json({ notes: notes.reverse() });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.post("/", authenticate(), (req, res) => {
  const { _id } = req.user;
  const user_id = new mongoose.Types.ObjectId(_id);
  const { flash_date } = req.body;

  const note = new Note({ user_id, ...req.body, flash_date });
  note
    .save()
    .then(note => {
      res.status(200).json({ note });
      const { _id, user_id } = note;
      return User.updateOne({ _id: user_id }, { $push: { notes: _id } }).exec();
    })
    .catch(error => {
      res.status(500).json({ ...error });
    });
});

module.exports = router;
