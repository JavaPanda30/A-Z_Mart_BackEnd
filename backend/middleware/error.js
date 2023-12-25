const Errorhandler = require("../Utils/Errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  //Wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new Errorhandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `EmailID Error: Invalid or Already registered`;
    err = new Errorhandler(message, 400);
  }
  if (err.name === "jsonwebTokenError") {
    const message = `JSON Web token Invalid`;
    err = new Errorhandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Token is Invalid`;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
