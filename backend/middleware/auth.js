const Errorhandler = require("../Utils/Errorhandler");
const catchasyncError = require("./catchasyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.isAuthenticatedUser = catchasyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new Errorhandler("Please Login to Access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new Errorhandler("Token has expired. Please log in again.", 401)
      );
    } else {
      return next(new Errorhandler("Invalid token. Please log in again.", 401));
    }
  }
});

exports.authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Errorhandler(
          `Role: ${req.user.role} is not allowed to access this page`,
          403
        )
      );
    }
    next();
  };
};
