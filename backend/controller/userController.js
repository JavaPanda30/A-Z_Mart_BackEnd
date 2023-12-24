const Errorhandler = require("../Utils/Errorhandler");
const sendToken = require("../Utils/jwtToken");
const catchasyncError = require("../middleware/catchasyncError");
const sendEmail = require("../Utils/sendEmails");
const User = require("../models/UserModel");
const crypto = require("crypto");

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

// Login User
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

//LogOut User
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

//Forgot Password
exports.forgetPassword = catchasyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User Email not Found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

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

// Reset Password
exports.resetPassword = catchasyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new Errorhandler("Reset Password Token is invalid or Expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmpassword) {
    return next(new Errorhandler("Unmatched Password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });
  sendToken(user, 200, res);
});
