const mongoose = require("mongoose");
const User = require("./user.model");

const postSchema = new mongoose.Schema(
  {
    // userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
    userId: { type: String, required: true},

    caption: { type: String, default: "caption" },
    postImage: { type: String, required: true },
    desc: { type: String },
    likeCount: { type: Number, default: 0 },
    likeList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],
    tagList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // 'User' should match the model name for User
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//   //Post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
