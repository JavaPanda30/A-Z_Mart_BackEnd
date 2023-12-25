const express = require("express");
const {
  registerUser,
  getAlluser,
  loginUser,
  logout,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatepassword,
  updateprofile,
  getSingleuser,
  updataUserRole,
  deleteUser,
} = require("../controller/userController");
const { authorizedRole, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAlluser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRole("admin"), getSingleuser);

router
  .route("/admin/user/role/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updataUserRole);

router
  .route("/admin/user/delete/:id")
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatepassword);

router.route("/me/update").put(isAuthenticatedUser, updateprofile);

module.exports = router;
