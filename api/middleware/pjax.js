module.exports = function() {
  return (req, res, next) => {
    const pjax = !!req.header("X-PJAX");
    req.pjax = pjax;
    res.locals.pjax = pjax;
    next();
  };
};
