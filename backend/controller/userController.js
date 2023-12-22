const Errorhandler = require("../Utils/Errorhandler");
const catchasyncError = require("../middleware/catchasyncError");
const User = require("../models/UserModel");

//register a user
exports.registerUser = catchasyncError(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "temp_id",
      url: "tempurl",
    },
  });
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});

//Get all user info --Admin
exports.getAlluser = catchasyncError(async (req, res) => {
  const user = await User.find();
  res.status(201).json({
    success: true,
    user,
  });
});

exports.loginUser = catchasyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //check if user has entered both
  if (!email || !password) {
    return next(new Errorhandler("Enter password and Email", 400));
  }
  //find if user exist
  const user = await User.findOne({ email }).select("+password");
  
  if (!user) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }
  //check password if user exist
  const isPasswordMatched = await user.comparePassword(password);
  
  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }
  
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});
