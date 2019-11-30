const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");

const user_singup = (req, res, next) => {
  const data = req.body;
  const { email, username, password } = data;

  User.checkField("email", email)
    .then(() => {
      return User.checkField("username", username);
    })
    .then(() => {
      return bcrypt.hash(password, 10).then(hash => hash);
    })
    .then(hash => {
      const _id = new mongoose.Types.ObjectId();

      const user = new User({
        _id,
        ...data,
        password: hash
      });

      return user.save().then(user => user);
    })
    .then(user => {
      //later send to /confirm and send email
      req.login(user, err => {
        console.log(user);
        res.render("index", { user }); //fix
      });
    })
    .catch(error => {
      const status = error.status ? error.status : 500;

      if (status == 5000) {
        req.flash("server-error", { message: error.message });
        res.redirect("/error");
      } else {
        req.flash("request-error", {
          message: error.message,
          data
        });
        res.redirect("/signup");
        //res.status(status).json({ error: { message: error.message } });
      }
    });
};

const user_logout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  user_singup,
  user_logout
};
