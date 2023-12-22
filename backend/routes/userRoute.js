const express = require("express");
const { registerUser, getAlluser } = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/users").get(getAlluser);

module.exports = router;
