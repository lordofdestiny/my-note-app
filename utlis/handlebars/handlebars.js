const path = require("path");
const handlebars = require("express-handlebars");
const handlebarsHelpers = require("./handlebarsHelpers");

const layoutsDir = path.join(__dirname, "..", "..", "/views/layouts/");

//Create Handlebars view engine configuration
const hbs = handlebars.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir,
  helpers: handlebarsHelpers,
});

module.exports = hbs;
