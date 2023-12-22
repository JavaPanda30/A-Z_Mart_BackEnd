const Errorhandler = require("../Utils/Errorhandler");
const Product = require("../models/productmodel");
const catchasyncError = require("../middleware/catchasyncError");
const ApiFeatures = require("../Utils/apifeatures");
const dotenv = require("dotenv")
dotenv.config({path:"/bakend/config/config.env"})


//create product --Admin
exports.createProduct = catchasyncError(async (req, res, next) => {
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
      error: error.name,
      message: error.message,
    });
  }
});

// Get All Product
exports.getallproducts = catchasyncError(async (req, res) => {
  const resultperpage = process.env.PERPAGE;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

//Get Product Details
exports.getProductdetails = catchasyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

//update Product --Admin
exports.updateProduct = catchasyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product not found", 404));
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
});

// Delete Product
exports.deleteProduct = catchasyncError(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (deletedProduct) {
    return res.status(200).json({
      success: true,
      message: "Product Deleted",
      deletedProduct,
    });
  } else {
    return next(new Errorhandler("Product not found", 404));
  }
});


