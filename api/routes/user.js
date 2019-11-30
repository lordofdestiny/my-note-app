const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserControllers = require("../controllers/user");
const User = require("../models/user");

router.post("/signup", UserControllers.user_singup);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/logout", UserControllers.user_logout);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById({ _id }, (error, user) => {
    done(error, user);
  });
});

module.exports = router;
