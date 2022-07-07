const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../api/models/user");

module.exports = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.find({ username }).exec();
    if (user.length < 1) {
      return done(null, false, {
        message: `Incorrect username!`,
      });
    }
    const response = await bcrypt.compare(password, user[0].password);
    if (response) {
      return done(null, user[0]);
    } else {
      return done(null, false, {
        message: "Incorrect password!",
      });
    }
  } catch (error) {
    done(error);
  }
});
