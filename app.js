const path = require("path");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const { getEnv } = require("./utlis/config");
const { buildMongoDBConnectionURI } = require("./utlis/helpers");
//Passport strategies
const localStrategy = require("./strategies/local");

//Route includes
const pageRoutes = require("./api/routes/page");
const userRoutes = require("./api/routes/user");
const noteRoutes = require("./api/routes/note");

//middleware includes
const CORS = require("./api/middleware/cors");
const pjax = require("./api/middleware/pjax");
const sameSite = require("./api/middleware/sameSite.js");
const ErrorHandler = require("./api/middleware/error");
const session = require("./api/middleware/session");

//View engine include
const handlebars = require("./utlis/handlebars/handlebars");

//Connect to MongoDB with Mongoose
mongoose.connect(
  buildMongoDBConnectionURI(getEnv().database),
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    appname: process.env.npm_package_name,
  },
  (error, db) => {
    if (error) {
      console.error(error.message);
      return process.exit(0);
    }
    console.log(
      `Sucessfuly connected to MongoDB as ${db.connection.user ?? "local dev"}!`
    );
  }
);
mongoose.Promise = global.Promise;

//Create express app
const app = express();

//Create Handlebars view engine
app.engine("hbs", handlebars.engine);
//Set hadnlebars as view engine
app.set("view engine", "hbs");
//Setup views path
app.set("viewes", path.join(__dirname, "views"));

//Setup static file serving
app.use(express.static(path.join(__dirname, "public")));

//Middlewares
app.use(morgan("dev"));
app.use(CORS());
app.use(pjax());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sameSite());
app.use(session());

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// app.post("/", (req, res) => {
//   res.send(req.body);
// });

//Setup imported routes
app.use("/", pageRoutes);
app.use("/user", userRoutes);
app.use("/note", noteRoutes);

//Use passport strategies
passport.use(localStrategy);

app.use(ErrorHandler.errorNotFound);
app.use(ErrorHandler.errorServerError);
app.use(ErrorHandler.errorNotCaught);

module.exports = app;
