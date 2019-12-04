module.exports = function() {
  return (req, res, next) => {
    res.setHeader("Set-Cookie", "SameSite=Strict;Secure;HttpOnly");
    next();
  };
};
