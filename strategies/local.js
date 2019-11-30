const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../api/models/user");

module.exports = new LocalStrategy((username, password, done) => {
  User.find({ username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        done(null, false, {
          message: "This user does not exist!" + "-" + username
        });
      }
      //user[0].passoword is a hash agains which we are checking
      bcrypt.compare(password, user[0].password).then(response => {
        if (response) {
          done(null, user[0]);
        } else {
          done(null, false, {
            message: "Incorrect password." + "-" + username
          });
        }
      });
    })
    .catch(error => {
      done(error);
    });
});
