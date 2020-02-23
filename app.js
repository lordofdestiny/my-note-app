const path = require("path");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const requestLogger = require("./api/middleware/requestLogger");

//Import environment configuration
const config = require("./utlis/config");

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
const ErrorMiddleware = require("./api/middleware/error");

//View engine include
const handlebars = require("./utlis/handlebars/handlebars");

//Create express app
const app = express();

//Create Handlebars view engine
app.engine("hbs", handlebars.engine);
//Set hadnlebars as view engine
app.set("view engine", "hbs");
//Setup views path
app.set("viewes", path.join(__dirname, "views"));

//Connect to MongoDB with Mongoose
mongoose.connect(
  "mongodb://localhost:27017/note-app",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    appname: "my-note-app"
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
app.use(CORS());
app.use(pjax());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  requestLogger({
    filter: ["/note"]
  })
);
app.use(cookieParser());
app.use(sameSite());

//Session setup
app.use(
  session({
    resave: false,
    secret: config.secret,
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
app.use(ErrorMiddleware.error_server_error);
app.use(ErrorMiddleware.error_not_caught);

module.exports = app;
