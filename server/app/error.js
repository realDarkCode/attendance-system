const notFoundHandler = (_req, _res, next) => {
  const error = new Error("Resource Not Found.");
  error.status = 404;
  next(error);
};

const errorHandler = (error, _req, res, _next) => {
  const message = error.message ? error.message : "Something went wrong";
  const status = error.status ? error.status : 500;

  if (error.status == 500) console.log(error);
  res.status(status).json({ message });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
