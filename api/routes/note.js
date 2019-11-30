const express = require("express");
const SSE = require("express-sse");
const mongoose = require("mongoose");
const moment = require("moment");
const router = express.Router();

const authenticate = require("../middleware/auth");

const Note = require("../models/note");
const User = require("../models/user");

const sse = new SSE([], { isSerialized: false, initialEvent: "all" });

router.get("/", authenticate(), (req, res, next) => {
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

router.get("/sse", sse.init);

router.post("/", authenticate(), (req, res, next) => {
  const { _id } = req.user;
  const user_id = new mongoose.Types.ObjectId(_id);
  const { flash_date } = req.body;

  console.log(flash_date);

  const note = new Note({ user_id, ...req.body, flash_date });
  note
    .save()
    .then(note => {
      res.status(200).json({ note });
      sse.send(note, "new");
      const { _id, user_id } = note;
      User.updateOne({ _id: user_id }, { $push: { notes: _id } }).exec();
    })
    .catch(error => {
      res.status(500).json({ ...error });
    });
});

module.exports = router;
