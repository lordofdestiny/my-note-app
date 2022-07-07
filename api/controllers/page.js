const User = require("../models/user");
const Note = require("../models/note");
const helper = require("../../utlis/helpers");

const page_index = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const notes = await Note.find({ user_id: _id }).lean().exec();
    res.render("index", {
      pjax: req.pjax,
      user: { ...req.user, notes },
      auth: req.isAuthenticated(),
      titleExtend: "Home",
      showOptions: true,
    });
  } catch (error) {
    error.status = 500;
    next(error);
    //res.status(500).render("error", { error: error.message });
  }
};

const page_profile = (req, res) => {
  res.render("profile", {
    user: req.user,
    auth: req.isAuthenticated(),
    titleExtend: "Profile",
    active: req.path,
  });
};

const page_login = (req, res) => {
  console.log(req.body);
  res.render("login", {
    titleExtend: "Log In",
    auth: req.isAuthenticated(),
    route: `/user${req.path}`,
    flash: {
      error: req.flash("error")[0],
      username: req.flash("username")[0],
    },
  });
};

const page_signup = (req, res) => {
  const flash = req.flash("request-error")[0];
  if (flash?.error) {
    flash.errors = helper.buildErrorArray(flash.errors);
  }
  res.status(200).render("signup", {
    titleExtend: "Sign Up",
    auth: req.isAuthenticated(),
    route: `/user${req.path}`,
    flash,
  });
};

module.exports = {
  page_index,
  page_profile,
  page_login,
  page_signup,
};
