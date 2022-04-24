const fs = require("fs");
const multer = require("multer");
const path = require("path");
const express = require("express");
const { User, Post, Image, Comment, Notification } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, verifyRefreshToken } = require("./middlewares");
const app = express();

// app.use("/", express.static(path.join(__dirname, "uploads")));

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// router.post(
//   "/addpost",
//   verifyToken,
//   upload.single("image"),
//   (req, res, next) => {
//     // console.log("???????????????????");
//     console.log("req.body:", req.body);
//     // console.log("req.file:", req.file);

//     res.status(201).json();
//   }
// );

router.post(
  "/addpost",
  verifyToken,
  upload.single("image"),
  async (req, res, next) => {
    try {
      // console.log("???????????????????");
      // console.log("req.body:", req.body);
      // console.log("req.file:", req.file);
      const post = await Post.create({
        content: req.body.content,
        UserId: req.userid,
      });

      const image = await Image.create({ src: req.file.filename });

      await post.addImages(image);

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
  }
);

module.exports = router;
