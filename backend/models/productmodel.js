const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description: {
        type: String,
        required: [true,"Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true,"Please Enter Product Price"],
        maxLength:[8,"Price Cannot Exceed 8 Figures"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type: String,
            required: true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"],
    },
    stock:{
        type:Number,
        required:[true,"Enter Product Stocks"],
        default:1,
        maxLength:[3,"CanNot Exceed 999"]
    },
    numberofreviews:{
        type:Number,
        default:0
    },
    reviews:
    [
        {
        name:{
            type:String,
            required:true
        },
        rating:{
            type:String,
            required:true,
        },
        comment:{
            type:String,
            required:true
        }
    }
],
    createdat:{
        type:Date,
        default:Date.now
    }


})
module.exports  = mongoose.model("Product",productSchema);