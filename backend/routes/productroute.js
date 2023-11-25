const express = require('express')
const { getallproducts, createProduct } = require('../controller/productcontroller')
const router = express.Router()

router.route("/products").get(getallproducts);
router.route("/product/new").post(createProduct);


module.exports = router