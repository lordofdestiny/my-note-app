const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");
// const Note = require("../models/note");

const user_singup = async (req, res, next) => {
  const data = req.body;
  try {
    // Hash the password
    const hash = await bcrypt.hash(data.password, 10);

    // Create a new user from the User model
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      ...data,
      password: hash,
    });
    // Save the user. If validation error happens, it is caught later
    const newUser = (await user.save()).toObject();

    // Once new user is created log him in and redirect him to index
    req.login(newUser, async () => {
      //later redirect to /confirm and send email
      res.redirect("/");
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.log(error);
      req.flash("request-error", { ...error, data });
      res.redirect("/signup");
      //res.status(status).json({ error: { message: error.message } });
    } else {
      return next(error);
    }
  }
};

const user_logout = (req, res, next) => {
  req.logout();
  res.clearCookie("connect.sid");
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  user_singup,
  user_logout,
};
