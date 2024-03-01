const router = require('express').Router()
const Comment = require("../model/comment.model")
//create a Comment
router.post("/", async (req, res) => {
    try {
      const comment = await Comment.create(req.body);
      return res.status(200).json(comment);
    } catch (err) {
      return res.status(300).json({ message: "comment not created", err });
    }
  });
//   652a797c92db2078c9fd96af
//get a Comment
router.get("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      return res.status(200).json(comment);
      
    } catch (err) {
      return res.status(300).json({ message: "comment not fetched", err });
    }
  });
module.exports = router
