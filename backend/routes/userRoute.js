const express = require("express");
const {
  registerUser,
  getAlluser,
  loginUser,
  logout,
} = require("../controller/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/users").get(getAlluser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

module.exports = router;
