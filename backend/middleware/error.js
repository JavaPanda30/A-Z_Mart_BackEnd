const errorhandler = require("../Utils/errorhandler");

module.exports = (err, res, req, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server ERROR";

  res.status(err.statusCode).json({
    success: false,
    error: err,
  });
};
