const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Enter Product Price"],
    maxLength: [8, "Price Cannot Exceed 8 Figures"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Enter Product Stocks"],
    default: 1,
    maxLength: [3, "CanNot Exceed 999"],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
