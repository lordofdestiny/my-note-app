const authenticate = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      //console.log(`User ID: ${JSON.stringify(req.session.passport.user)}`);
      return next();
    }

    res.redirect("/login");
  };
};

const skipIfAuthenticated = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      next();
    }
  };
};

module.exports = {
  authenticate,
  skipIfAuthenticated,
};
