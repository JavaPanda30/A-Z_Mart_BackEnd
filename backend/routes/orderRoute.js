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
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrder);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRole("admin"), GetAllOrders);
router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteOrders)
  .put(isAuthenticatedUser, authorizedRole("admin"), orderStatus);
module.exports = router;
