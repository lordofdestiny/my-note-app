const path = require("path");
const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth");

const pageController = require("../controllers/page");

router.get("/", authenticate(), pageController.page_index);

router.get("/profile", authenticate(), pageController.page_profile);

router.get("/login", pageController.page_login);

router.get("/signup", pageController.page_signup);

router.get("/error", pageController.page_error);

router.get("/vue", authenticate(), (req, res) => {
  res.sendFile(path.join(__dirname, "../", "../", "public", "test.html"));
});

module.exports = router;
