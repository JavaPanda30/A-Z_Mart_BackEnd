const Errorhandler = require("../Utils/Errorhandler");
const sendToken = require("../Utils/jwtToken");
const catchasyncError = require("../middleware/catchasyncError");
const sendEmail = require("../Utils/sendEmails");
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
  sendToken(user, 201, res);
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

  sendToken(user, 200, res);
});

exports.logout = catchasyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.forgetPassword = catchasyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User Email not Found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/${resetToken}`;

  const mailmsg = `Your password Token is :- \n\n${resetPasswordUrl}\n\n if not requested Ignore this mail.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "AZ-Mart Password Reset Link",
      mailmsg,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} Successfully!!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new Errorhandler(error.message, 500));
  }
});
