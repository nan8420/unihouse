// 포트폴리오를 위해 .env 의도적으로 깃헙에 올림

const fs = require("fs");
const multer = require("multer");
const path = require("path");
const express = require("express");
const {
  User,
  Post,
  Image,
  Comment,
  Notification,
  Likecomment,
} = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, verifyRefreshToken } = require("./middlewares");
const app = express();

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

router.get("/", verifyToken, async (req, res, next) => {
  try {
    console.log("loadposts!!!!!!!!!!!!!!!!!!!!1");
    console.log("req.query.lastId:::", req.query.lastId);
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Likecomment,
          attributes: ["id", "CommentId", "PostId", "UserId"],
        },
      ],
    });
    // console.log("posts::::", JSON.stringify(posts));
    res.status(200).json(posts);
  } catch (error) {
    next(error);
    console.error(error);
  }
});

router.get("/:postId", async (req, res, next) => {
  try {
    console.log("이건아님!!!!!!!!!!!!!1");
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Likecomment,
          attributes: ["id", "CommentId", "PostId", "UserId"],
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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

      // console.log("req.body:", req.body);
      // console.log("req.file.filename:", req.file.filename);
      if (req.body.image !== "undefined") {
        const image = await Image.create({ src: req.file.filename });
        await post.addImages(image);
      }

      await Post.findOne({
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
      res.status(201).send("성공");

      // console.log("fullPost:", fullPost);
      // res.status(201).json(fullPost);
      // res.status(201);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.patch("/:postId/like", verifyToken, async (req, res, next) => {
  // PATCH /post/1/like
  try {
    // const post = await Post.findOne({ where: { id: req.params.postId } });

    console.log("req.params.postId:", req.params.postId);
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });

    // console.log("post:::", JSON.stringify(post));

    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }

    console.log("post.Likers[0]:", post.Likers[0]);

    if (post.Likers[0]) {
      if (
        post.Likers[0].Like?.PostId === post.id &&
        post.Likers[0].Like?.UserId === req.userid
      ) {
        console.log("postlike 두번 요청됨");
        return res.status(403).send("postlike 두번 요청됨");
      }
    }

    // console.log("post.Likers:::", JSON.stringify(post.Likers[0].Like));
    // console.log("post.id:", post.id);
    // console.log("req.userid :", req.userid);

    // console.log("post.Likers[0].Like:", post.Likers[0].Like.PostId);

    // console.log("post.Likers[0].Like.UserId:", post.Likers[0].Like.UserId);
    await post.addLikers(req.userid);
    res.json({ PostId: post.id, UserId: req.userid });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", verifyToken, async (req, res, next) => {
  // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.userid);
    res.json({ PostId: post.id, UserId: req.userid });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment", verifyToken, async (req, res, next) => {
  // POST /post/1/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.userid,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/commentLike", verifyToken, async (req, res, next) => {
  // PATCH /post/1/like
  try {
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiii");
    console.log("req.body:::", req.body);
    const post = await Post.findOne({ where: { id: req.body.postId } });
    // console.log("post:::", post);
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }

    const excommetlike = await Likecomment.findOne({
      where: {
        UserId: req.userid,
        PostId: req.body.postId,
        CommentId: req.body.commentId,
      },
      // attributes: ["id", "CommentId", "PostId", "UserId"],
    });

    if (excommetlike) {
      return res.status(403).send("likecomment 두번 요청됨");
    }
    // console.log("excommetlike:::", excommetlike);
    const likecomment = await Likecomment.create({
      UserId: req.userid,
      PostId: req.body.postId,
      CommentId: req.body.commentId,
    });

    const fulllikecomment = await Likecomment.findOne({
      where: { id: likecomment.id },
      attributes: ["id", "CommentId", "PostId", "UserId"],
    });
    console.log(
      "fulllikecomment::::",
      JSON.stringify(fulllikecomment),
      "enddddd"
    );
    res.json(fulllikecomment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/commentUnLike", verifyToken, async (req, res, next) => {
  // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.body.postId } });
    // console.log("post:::", post);
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    const fulllikecomment = await Likecomment.findOne({
      where: {
        UserId: req.userid,
        PostId: req.body.postId,
        CommentId: req.body.commentId,
      },
      attributes: ["id", "CommentId", "PostId", "UserId"],
    });

    await Likecomment.destroy({
      where: {
        UserId: req.userid,
        PostId: req.body.postId,
        CommentId: req.body.commentId,
      },
    });

    //  console.log("fulllikecomment::::",JSON.stringify(fulllikecomment),"enddddd");

    res.json({
      CommentId: req.body.commentId,
      PostId: req.body.postId,
      UserId: req.userid,
      id: fulllikecomment.id,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
