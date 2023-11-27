const express = require("express");
const {
  getallproducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productcontroller");
const router = express.Router();

router.route("/product").get(getallproducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct);
router.route("/product/remove/:id").delete(deleteProduct);

module.exports = router;
