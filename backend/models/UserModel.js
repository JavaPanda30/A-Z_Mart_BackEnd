const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please Enter UserName"],
            maxLength:[30,"Name cannot exceed 30 character"],
            minLength:[4,"Name cannot be less than 4 character"],
        },
        email:{
            type:String,
            required:[true,"please Enter Email"],
            unique:true,
            validate:[validator.isEmail,"Please Enter Valid Email"]
        },
        password:{
            type:String,
            required:[true,"please Enter Password"],
            minLength:[8,"Password should be 8 character"],
            select:false,
        },
        avatar:[
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
        role:
        {
            type:String,
            default:"user",
        },
        resetPasswordToken:String,
        resetPasswordExpire: Date,
    }
)

module.exports=mongoose.model("user",userSchema);