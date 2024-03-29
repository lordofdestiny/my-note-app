const path = require("path");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

//Helpers
const handlebarsHelpers = require("./utli/hbsHelpers");

//Passport strategies
const localStrategy = require("./strategies/local");

//Route includes
const pageRoutes = require("./api/routes/page");
const userRoutes = require("./api/routes/user");
const noteRoutes = require("./api/routes/note");

//middleware includes
const CORS = require("./api/middleware/cors");
const ErrorMiddleware = require("./api/middleware/error");

//Create Handlebars view engine configuration
const hbs = handlebars.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts/",
  helpers: handlebarsHelpers
});

const app = express();

//Create Handlebars view engine
app.engine("hbs", hbs.engine);
//Set hadnlebars as view engine
app.set("view engine", "hbs");
//Setup views path
app.set("viewes", path.join(__dirname, "views"));

//Connect to MongoDB with Mongoose
mongoose.connect(
  "mongodb://localhost:27017/note-app",
  {
    useNewUrlParser: true
  },
  (error, db) => {
    if (error) {
      console.error(error.message);
      process.exit(0);
    } else {
      console.log("Sucessfuly connected to MongoDB!");
    }
  }
);
mongoose.Promise = global.Promise;

//Setup static file serving
app.use(express.static(path.join(__dirname, "public")));

//Middlewares
app.use(morgan("dev"));
app.use(CORS);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Session setup
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    //cookie: { maxAge: 60 * 60 * 1000 } //1 Hour
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.post("/", (req, res) => {
  res.send(req.body);
});

//Setup imported routes
app.use("/", pageRoutes);
app.use("/user", userRoutes);
app.use("/note", noteRoutes);

passport.use(localStrategy);

app.use(ErrorMiddleware.error_not_found);

app.use(ErrorMiddleware.error_not_catched);

module.exports = app;
