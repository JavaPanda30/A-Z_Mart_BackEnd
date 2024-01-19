const express = require("express");
const {
  newOrder,
  GetAllOrders,
  getSingleOrder,
  getMyOrder,
  deleteOrders,
  orderStatus,
} = require("../controller/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, getSingleOrder)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteOrders)
  .post(isAuthenticatedUser, authorizedRole("admin"), orderStatus);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrder);
router
  .route("/orders")
  .get(isAuthenticatedUser, authorizedRole("admin"), GetAllOrders);

module.exports = router;
