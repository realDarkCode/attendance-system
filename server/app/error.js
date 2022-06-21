const notFoundHandler = (_req, _res, next) => {
  const error = new Error("Resource Not Found.");
  error.status = 404;
  next(error);
};

const errorHandler = (error, _req, res, _next) => {
  if (!error.status) {
    console.log(error);
    error.status = 500;
    error.message = "Something went wrong";
  }
  res.status(error.status).json({ message: error.message });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
