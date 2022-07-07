const mongoose = require("mongoose");
const { toTitleCase } = require("../../utlis/helpers");

const uniqueValueValidator = (modelName, filedName, message) => {
  return async (value) => {
    return new Promise(async (resolve, reject) => {
      const user = await mongoose
        .model(modelName)
        .find({ [filedName]: value })
        .exec();
      if (user.length >= 1) {
        reject(message);
      } else {
        resolve(true);
      }
    });
  };
};

const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Empty _id is not allowed!"],
  },
  first_name: { type: String, required: false, default: () => null },
  last_name: { type: String, required: false, default: () => null },
  phone: { type: String, required: false, default: () => null },
  email: {
    type: String,
    required: [true, "Empty email is not allowed"],
    unique: true,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    validate: {
      validator: uniqueValueValidator(
        "User",
        "email",
        "This email address is already taken!"
      ),
    },
  },
  username: {
    type: String,
    required: [true, "Empty username is not allowed"],
    unique: true,
    match: /^[a-zA-Z0-9]/,
    minlength: 8,
    maxlength: 25,
    validate: {
      validator: uniqueValueValidator(
        "User",
        "username",
        "This username is already in use!"
      ),
    },
  },
  password: {
    type: String,
    required: [true, "Empty password is not allowed!"],
    match: /^[a-zA-Z0-9!@#$%^&* !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/,
  },
  gender: {
    type: String,
    require: false,
    enum: ["male", "female", "rns", "unset"],
    default: () => "unset",
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
