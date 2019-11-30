module.exports = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log(`User ID: ${JSON.stringify(req.session.passport.user)}`);
      return next();
    }

    res.redirect("/login");
  };
};
