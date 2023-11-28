const Product = require("../models/productmodel");

//create product --Admin
exports.createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
// Get All Product
exports.getallproducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      return res.status(200).json({
        success: true,
        products,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

//Get Product Details

exports.getProductdetails = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  return res.status(200).json({
    success: true,
    product,
  });
};

//update Product --Admin

exports.updateProduct = async (req, res) => {
  let product = Product.findById(req.param.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (deletedProduct) {
      return res.status(200).json({
        success: true,
        message: "Product Deleted",
        deletedProduct,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found. Check the ID.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
};
