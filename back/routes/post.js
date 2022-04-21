const express = require("express");
const { User, Post, Image, Comment, Notification } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, verifyRefreshToken } = require("./middlewares");

router.post("/addpost", verifyToken, async (req, res, next) => {
  try {
    console.log("???????????????????");
    const post = await Post.create({
      content: req.body.post,
      UserId: req.userid,
    });

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
