const express = require("express");
const {
  getallproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductdetails,
} = require("../controller/productcontroller");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.route("/product").get(isAuthenticatedUser,getallproducts);
router.route("/product/new").post(createProduct);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductdetails);

module.exports = router;
