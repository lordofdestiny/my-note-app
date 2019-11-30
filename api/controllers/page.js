const User = require("../models/user");
const helper = require("../../utli/helpers");

const page_index = (req, res) => {
  const auth = req.isAuthenticated();
  const { _id } = req.user;
  User.findById(_id, "first_name last_name")
    .exec()
    .then(user => {
      res.render("index", {
        auth,
        titleExtend: "Home",
        user,
        showOptions: true
      });
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

const page_profile = (req, res) => {
  const auth = req.isAuthenticated();
  const { _id } = req.user;
  User.findById(_id, "first_name last_name username email phone gender")
    .then(user => {
      res.render("profile", {
        user: user.toObject(),
        auth,
        titleExtend: "Profile",
        active: req.path
      });
    })
    .catch(error => {
      res.render("error", { error: error.message });
    });
};

const page_login = (req, res) => {
  const auth = req.isAuthenticated();
  if (auth) {
    res.redirect("/");
  } else {
    res.render("login", {
      titleExtend: "Log In",
      auth,
      route: `/user${req.path}`,
      flash: helper.flashToError(req.flash("error"))
    });
  }
};

const page_signup = (req, res) => {
  const flash = req.flash("request-error")[0];
  const auth = req.isAuthenticated();
  if (auth) {
    res.redirect("/");
  } else {
    res.status(200).render("signup", {
      titleExtend: "Sign Up",
      auth,
      route: `/user${req.path}`,
      flash
    });
  }
};

const page_error = (req, res) => {
  const flash = req.flash("server-error");
  if (flash.length == 0) {
    res.redirect("/");
  } else {
    res.render("error", { flash });
  }
};

module.exports = {
  page_index,
  page_profile,
  page_login,
  page_signup,
  page_error
};
