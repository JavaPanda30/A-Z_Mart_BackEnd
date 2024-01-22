const Order = require("../models/orderModel");
const Product = require("../models/productmodel");
const ErrorHander = require("../Utils/Errorhandler");
const catchAsyncErrors = require("../middleware/catchasyncError");
const catchasyncError = require("../middleware/catchasyncError");

//Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

//Get All Orders
exports.GetAllOrders = catchasyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    total: totalAmount,
    Orders: orders,
  });
});

//Get Single Order Details with user name and email
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHander("Order not found with Given ID", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//Get Logged In Order Details
exports.getMyOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    order,
  });
});

//Update Order Status --Admin
exports.orderStatus = catchasyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHander("Order not found with Given ID", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("Order Delivered Already", 404));
  }
  const arr = order.orderItems;
  arr.forEach(async (orders) => {
    await updateStock(orders.product, orders.quantity);
  });

  order.orderStatus = req.body.status;

  if ((req.body.status = "Delivered")) {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
//Update On Delivery of the Order
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });

  return;
}

//Delete Order --Admin
exports.deleteOrders = catchasyncError(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    Order: order,
  });
});
