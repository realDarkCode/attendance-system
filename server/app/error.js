const notFoundHandler = (_req, _res, next) => {
  const error = new Error("Resource Not Found.");
  error.status = 404;
  next(error);
};

const errorHandler = (error, _req, res, _next) => {

  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
  console.log(error);
  res.status(500).json({
    message: "internal server error occurred.",
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
