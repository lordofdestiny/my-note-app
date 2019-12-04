const error_not_found = (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
};

const error_not_catched = (error, req, res) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      stack: error.stack
    }
  });
};

module.exports = {
  error_not_found,
  error_not_catched
};
