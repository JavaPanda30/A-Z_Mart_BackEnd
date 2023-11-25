const Product = require('../models/productmodel')

//create product
exports.createProduct = async (req,res,next)=>{
    const product = Product.create(req.body);
    res.status(201).json({
        "success":true,
        product
    });
}

exports.getallproducts = (req,res)=>{
    res.status(200).json({"message":"route is working"})
}