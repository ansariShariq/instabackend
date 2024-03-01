const Post = require("../model/post.model");
const User = require("../model/user.model");

const router = require("express").Router();

// router.get('/',(req,res)=>{
//     console.log("hello everyone")
// })

//create a post
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(300).json({ message: "Post not created", err });
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { userId } = req.body;

    if (post.userId.toHexString() === userId) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        return res
          .status(201)
          .json({ meassage: "Post Got Updated", updatedPost });
      } catch (err) {
        return res.status("something Went Wrong");
      }
    } else {
      return res.status(401).json({ message: "you can update Your post Only" });
    }

    // res.status(200).json(post)
  } catch (err) {
    return res
      .status(300)
      .json({ message: "unable to get the Post Or this post doesn't exists" });
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { userId } = req.body;

    if (post.userId.toHexString() === userId) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        return res.status(201).json({ meassage: "Post Got Deleted" });
      } catch (err) {
        return res.status("something Went Wrong");
      }
    } else {
      return res.status(401).json({ message: "you can delete Your post Only" });
    }

    // res.status(200).json(post)
  } catch (err) {
    return res
      .status(300)
      .json({ message: "unable to get the Post Or this post doesn't exists" });
  }
});
//like a post or Unlike apost
router.patch("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const { userId } = req.body;
    if (!post.likeList.includes(userId)) {
      try {
        const Liked = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $push: { likeList: userId },
            $set: { likeCount: post.likeCount + 1 },
          },
          { new: true }
        )
          .populate("likeList")
          .exec();
        return res
          .status(200)
          .json({ message: "You successfully Liked The Post", Liked });
      } catch (err) {
        return res
          .status(500)
          .json({ meassage: "internal Server Error post couldn't like" });
      }
    } else {
      try {
        const unLiked = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $pull: { likeList: userId },
            $set: { likeCount: post.likeCount - 1 },
          },
          { new: true }
        );
        return res
          .status(200)
          .json({ message: "You successfully unLiked The Post", unLiked });
      } catch (err) {
        return res
          .status(500)
          .json({ meassage: "internal Server Error post couldn't unlike" });
      }
    }

    // res.status(200).json(post)
  } catch (err) {
    return res
      .status(300)
      .json({ message: "unable to get the Post Or this post doesn't exists" });
  }
});

// Post timeline i.e all the Post by given User,and It's Followers

router.post("/timeline", async (req, res) => {
  try {
    const curUser = await User.findById(req.body.userId);
    try {

      // all the post by user and His Following
      const userPosts = await Post.find({ userId: req.body.userId });
      try {
        const friendsPosts =await Promise.all(
          curUser.following.map((friendId) => {
            
           return Post.find({ userId: friendId });
          })
        );
       

        // all the post by user and His Following
        // const friendsPosts = await Post.find({userId:{$in:curUser.following}});
       

        return res.send(
          [...userPosts, ...friendsPosts.flat()]
        );
      } catch (err) {
        res.status(500).json({ message: "friend's post couldn't get" });
      }
    } catch (err) {
      return res.status(400).json({ meassage: "User don't Have Posts" });
    }
  } catch (err) {
    return res.status(400).json({ meassage: "User Doesn't Exists" });
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(300).json({ message: "unable to get the Post" });
  }
});
module.exports = router;
