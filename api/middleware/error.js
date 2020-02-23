const error_not_found = (req, res, next) => {
  res.render("notfound", {
    route: req.baseUrl + req.path,
    titleExtend: "Error"
  });
};

const error_server_error = (error, req, res, next) => {
  if (error.status == 500) {
    res.render("error", { error, dev: false });
  } else {
    next(error);
  }
};

const error_not_caught = (error, req, res, next) => {
  res.render("error", {
    error,
    dev: true
  });
};

module.exports = {
  error_not_found,
  error_server_error,
  error_not_caught
};
