const express = require("express");
const router = express.Router();

const { authenticate, skipIfAuthenticated } = require("../middleware/auth");

const pageController = require("../controllers/page");

router.get("/", authenticate(), pageController.page_index);

router.get("/profile", authenticate(), pageController.page_profile);

router.get("/login", skipIfAuthenticated(), pageController.page_login);

router.get("/signup", skipIfAuthenticated(), pageController.page_signup);

router.get("/error", (req, res) => {
  res.render("error", { error: req.flash("error")[0], dev: true });
});

module.exports = router;
