const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Note must have a user!"]
  },
  date_created: {
    type: Date,
    default: () => new Date()
  },
  date_modified: {
    type: Date,
    default: () => new Date()
  },
  title: {
    type: String,
    required: [true, "Note must have a title!"]
  },
  text: {
    type: String,
    required: [true, "Note must have a text!"]
  },
  flash_date: {
    type: Date,
    default: null
  },
  media: []
});

module.exports = mongoose.model("Note", noteSchema);
