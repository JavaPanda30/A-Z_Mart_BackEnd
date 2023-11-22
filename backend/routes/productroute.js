const express = require('express')
const { getAllprodusts } = require('../controller/productcontroller')
const router = express.Router()


router.route("/products").get(getAllprodusts)

module.exports = router