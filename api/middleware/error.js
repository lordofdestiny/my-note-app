const errorNotFound = (req, res, next) => {
  res.render("notfound", {
    route: req.baseUrl + req.path,
    titleExtend: "Error",
  });
};

const errorServerError = (error, req, res, next) => {
  if (error.status == 500) {
    res.render("error", { error, dev: false });
  } else {
    next(error);
  }
};

const errorNotCaught = (error, req, res, next) => {
  res.render("error", {
    error,
    dev: true,
  });
};

module.exports = {
  errorNotFound,
  errorServerError,
  errorNotCaught,
};

// const errorNotFound = (req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// };

// const errorNotCaught = (error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//       stack: error.stack,
//     },
//   });
// };

// module.exports = {
//   errorNotFound,
//   errorNotCaught,
// };
