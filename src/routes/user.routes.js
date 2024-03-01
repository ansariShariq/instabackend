const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const createError = require("../utilities/createError");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(304).json({ meassage: "User Not Found" });
  }
});

//Getting A User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -_id -__v"
    );
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(304).json({ meassage: "User Not Found" });
  }
});

// Updating a User
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (req.body.userId !== req.params.id)
      return res.status(400).json({ message: "You are not Authorised" });

    try {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          console.log(salt, hashedPassword);
          req.body.password = hashedPassword;
          console.log("password Hashed successfully");
          // res.status(200).json(user)
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "internal Server Error" });
        }
      }

      console.log(req.body.password);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.json({ meassage: "Acount Has Updated", updatedUser });
    } catch (err) {
      res.status(500).json({ meassage: "Something Went Wrong" });
    }
    if (!user) console.log("User Not Found");
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    // console.error(err)
    res.json(err);
    //  createError(err,400)
  }
});

// Deleting A User
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user && res.status(400).json({ message: "user doesn't exist" });

    if (req.params.id !== req.body.userId || user.isAdmin)
      return res
        .status(400)
        .json({ message: "You are not authorised to delete" });

    await User.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "your account got deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "You can Delete Only Your Account" });
  }
});

// follow A User
router.patch("/:id/follow", async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  if (userId !== id) {
    try {
      const user = await User.findById(userId);
      const tobeFollowed = await User.findById(id);

      if (tobeFollowed.followers.includes(userId))
        return res.status(401).json({ message: "You Already Follow the User" });
      await tobeFollowed.updateOne({ $push: { followers: userId } });
      await user.updateOne({ $push: { following: id } });

      return res.status(201).json({
        message: `You followed ${tobeFollowed.username} successfully`,
      });
    } catch (err) {
      res.status(400).send({ message: "User Not Found/ not followed" });
    }
  } else {
    return res.status(400).json({ message: "You can't follow Your self" });
  }
});

// unfollow A User

router.patch("/:id/unfollow", async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  if (userId !== id) {
    try {
      const user = await User.findById(userId);
      const tobeUnfollowed = await User.findById(id);

      if (!tobeUnfollowed.followers.includes(userId))
        return res.status(401).json({
          message: `${user.username}, You already unfollow the ${tobeUnfollowed.username}`,
        });
      await tobeUnfollowed.updateOne({ $pull: { followers: userId } });
      await user.updateOne({ $pull: { following: id } });

      return res.status(201).json({
        message: `${user.username}, You unfollowed ${tobeUnfollowed.username} successfully`,
      });
    } catch (err) {
      res.status(400).send({ message: "User Not Found/ not followed" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "You can't follow or unfollow Yourself" });
  }
});

module.exports = router;
