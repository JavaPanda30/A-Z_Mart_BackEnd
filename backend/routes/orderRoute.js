const express = require("express");
const {
  newOrder,
  GetAllOrders,
  getSingleOrder,
  getMyOrder,
} = require("../controller/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrder);
router
  .route("/orders")
  .get(isAuthenticatedUser, authorizedRole("admin"), GetAllOrders);

module.exports = router;
