const mongoose = require("mongoose");
const User = require("./user.model");
const Post = require("./post.model");



const commentSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:User,required:true},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:Post,required:true},
    desc:{type:String,required:true}
    
    
},
{
    timestamps:true,
    versionKey:false
})

const Comment = mongoose.model("Comment",commentSchema)
module.exports = Comment
