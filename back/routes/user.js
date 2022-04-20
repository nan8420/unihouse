const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post, Image, Comment, Notification } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "JWT_SECRET";

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("토근없음");
    return res.status(401).json({ message: "토큰이 없습니다." });
  }
  try {
    const data = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      jwtSecret
    );
    console.log("data!!!!", data);
    req.userid = data.userId;
    // res.locals.userid = data.userId;
    res.locals.email = data.email;
    console.log("-----------------------");
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(419)
        .json({ message: "만료된 액세스 토큰입니다.", code: "expired" });
    }
    return res
      .status(401)
      .json({ message: "유효하지 않은 액세스 토큰입니다." });
  }
  next();
};

const verifyRefreshToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }
  try {
    const data = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      jwtSecret
    );
    res.locals.email = data.email;
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(420)
        .json({ message: "만료된 리프레시 토큰입니다.", code: "expired" });
    }
    return res
      .status(401)
      .json({ message: "유효하지 않은 리프레시 토큰입니다." });
  }
  next();
};

router.post(
  "/refreshRefreshToken",
  verifyRefreshToken,
  async (req, res, next) => {
    const refreshToken = jwt.sign(
      //추가한 부분
      { sub: "refresh", email: res.locals.email, userId: user.id },
      jwtSecret,
      { expiresIn: "24h" }
    );

    const user = await User.findOne({
      where: { email: res.locals.email },
    });

    // console.log("user::", user);

    if (!user) {
      return res.status(404).json({ message: "가입되지 않은 회원입니다." });
    }
    // if (!users[res.locals.email]) {
    //   return res.status(404).json({ message: "가입되지 않은 회원입니다." });
    // }
    // console.log("refreshToken:::", refreshToken);
    res.json({
      data: {
        refreshToken, // 추가한 부분
      },
    });
  }
);

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return res.status(401).json({ message: "가입하지 않은 회원입니다." });
  }

  const passowrdsucess = await bcrypt.compare(req.body.password, user.password);

  if (!passowrdsucess) {
    return res.status(401).json({ message: "비밀번호가 틀렸습니다" });
  }

  const accessToken = jwt.sign(
    { sub: "access", email: req.body.email, userId: user.id },
    jwtSecret,
    // { expiresIn: "5m" }
    { expiresIn: "60s" }
  );

  const refreshToken = jwt.sign(
    { sub: "refresh", email: req.body.email, userId: user.id },
    jwtSecret,
    { expiresIn: "24h" }
  );

  const fulluser = await User.findOne({
    where: { id: user.id },
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: Post,
        attributes: ["id"],
      },
    ],
  });

  // console.log("fulluser:", fulluser);
  return res.status(200).json({
    user: fulluser,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

router.post("/signup", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디 입니다!");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/addpost", verifyToken, async (req, res, next) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.userid::::", req.userid);
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
