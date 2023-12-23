const express = require("express");
const {
  registerUser,
  getAlluser,
  loginUser,
  logout,
} = require("../controller/userController");
const { authorizedRole, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/users").get(isAuthenticatedUser,authorizedRole("admin"),getAlluser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

module.exports = router;
