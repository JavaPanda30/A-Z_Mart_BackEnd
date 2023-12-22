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
  res.status(201).json({
    success: true,
    user,
  });
});

//Get all user info --Admin
exports.getAlluser = catchasyncError(async(req,res)=>{
  const user = await User.find();
  res.status(201).json({
    success:true,
    user
  })
})