const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const { getEnv } = require("../../utlis/config");

const config = getEnv();

module.exports = () => {
  return session({
    resave: false,
    secret: config.secret,
    saveUninitialized: true,
    rolling: true,
    store: MongoStore.create({
      client: mongoose.connection.client,
      autoRemove: "native",
      ttl: 60 * 60 * 1000,
    }),
    //cookie: { maxAge: 1000 * 60 * 30 } //1000 millis * 60 (seconds) * 30(minutes) = 30minutes
  });
};
