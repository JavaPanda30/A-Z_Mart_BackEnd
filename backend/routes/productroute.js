const express = require("express");

const {
  getallproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductdetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controller/productcontroller");

const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const router = express.Router();

router
  .route("/admin/product")
  .get(isAuthenticatedUser, authorizedRole("admin"), getallproducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRole("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteProduct);

router.route("/product/:id").get(getProductdetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
