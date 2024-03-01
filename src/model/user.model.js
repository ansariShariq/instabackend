
const mongoose = require('mongoose')
const User = require('../model/user.model')
const userSchema = new mongoose.Schema({
    username :{type:String,required:true,unique:true,min:3,max:20},
    email:{type:String,required:true,unique:true,min:5,max:20},
    password:{type:String,required:true,min:3},
    profilePicture:{type:String,default:""},
    coverPicture:{type:String,default:''},
    following:{type:Array,default:[]},
    // following:[{type:mongoose.Schema.Types.ObjectId, ref:User}],

    followers:{type:Array,default:[]},
    isAdmin:{type:Boolean,default:false},
    desc:{type:String,max:80}
},{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)












// const { default: mongoose } = require("mongoose");



// const userSchema = new mongoose.Schema(
//     {
//       firstName: { type: String, required: true },
//       lastName: { type: String, require: true },
//       // userName:{ type: String, require: true },
//       password: { type: String, require: true },
//       email: { type: String, require: true, unique: true },
//       bio: String,
//       profileImage: { type: String},
//       followingList: { type: Array },
//     },
//     {
//       timestamps: true,
//       versionKey: false,
//     }
//   );
//   //User model
//   const User = new mongoose.model("users", userSchema);

//   module.exports = User