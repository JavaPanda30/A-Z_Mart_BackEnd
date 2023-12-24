const express = require("express");

const {
  getallproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductdetails,
} = require("../controller/productcontroller");

const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const router = express.Router();

router.route("/product").get(getallproducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizedRole("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteProduct)
  .get(getProductdetails);

module.exports = router;
