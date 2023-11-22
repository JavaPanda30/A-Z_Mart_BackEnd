const express = require('express')
const { getAllprodusts, getallproducts } = require('../controller/productcontroller')
const router = express.Router()


router.route("/products").get(getallproducts)

module.exports = router