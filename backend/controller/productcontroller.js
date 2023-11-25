const Product = require('../models/productmodel')

//create product
exports.createProduct = async (req, res) => {
    console.log(req.body); 
    try 
    {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

exports.getallproducts = (req,res)=>{
    res.status(200).json({"message":"route is working"})
}