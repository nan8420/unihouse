const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post, Image, Comment, Notification } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, verifyRefreshToken } = require("./middlewares");

// const jwtSecret = "JWT_SECRET";

// const verifyToken = (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "토큰이 없습니다." });
//   }
//   try {
//     // console.log(" 엑세스  req.headers:", req.headers);

//     const data = jwt.verify(
//       req.headers.authorization.replace("Bearer ", ""),
//       jwtSecret
//     );
//     req.userid = data.userId;
//     // res.locals.userid = data.userId;
//     res.locals.email = data.email;
//   } catch (error) {
//     console.error(error);
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(419)
//         .json({ message: "만료된 액세스 토큰입니다.", code: "expired" });
//     }
//     return res
//       .status(401)
//       .json({ message: "유효하지 않은 액세스 토큰입니다." });
//   }
//   next();
// };

// const verifyRefreshToken = (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "토큰이 없습니다." });
//   }
//   try {
//     // console.log("22222222222222222");
//     console.log(" 리프레시  req.headers:", req.headers);

//     const data = jwt.verify(
//       req.headers.authorization.replace("Bearer ", ""),
//       jwtSecret
//     );
//     req.userid = data.userId;
//     res.locals.email = data.email;
//   } catch (error) {
//     console.error(error);
//     if (error.name === "TokenExpiredError") {
//       console.log("리프레시토근 만료");
//       return res
//         .status(420)
//         .json({ message: "만료된 리프레시 토큰입니다.", code: "expired" });
//     }
//     return res
//       .status(401)
//       .json({ message: "유효하지 않은 리프레시 토큰입니다." });
//   }
//   next();
// };

router.post("/refreshToken", verifyRefreshToken, async (req, res, next) => {
  const accessToken = jwt.sign(
    { sub: "access", email: res.locals.email, userId: req.userid },

    process.env.ACCESS_TOKEN_SECRET,
    // jwtSecret,
    { expiresIn: "30m" }
    // { expiresIn: "30s" }
  );

  const user = await User.findOne({
    where: { email: res.locals.email },
  });

  if (!user) {
    return res.status(404).json({ message: "가입되지 않은 회원입니다." });
  }
  res.json({
    data: {
      accessToken,
      email: res.locals.email,
      // name: users[res.locals.email].name,
    },
  });
});

router.post(
  "/refreshRefreshToken",
  verifyRefreshToken,
  async (req, res, next) => {
    const refreshToken = jwt.sign(
      //추가한 부분
      { sub: "refresh", email: res.locals.email, userId: req.userid },
      process.env.REFRESH_TOKEN_SECRET,
      // jwtSecret,
      // { expiresIn: "60s" }
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
  // console.log("req.headers:::", req.headers);
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
    process.env.ACCESS_TOKEN_SECRET,
    // jwtSecret,
    { expiresIn: "30m" }
    // { expiresIn: "30s" }
  );
  // console.log("accessToken:", accessToken);
  const refreshToken = jwt.sign(
    { sub: "refresh", email: req.body.email, userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    // jwtSecret,
    { expiresIn: "24h" }
    // { expiresIn: "60s" }
  );
  console.log("refreshToken:", refreshToken);

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
      univ: req.body.univ,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.post("/addpost", verifyToken, async (req, res, next) => {
//   try {
//     const post = await Post.create({
//       content: req.body.post,
//       UserId: req.userid,
//     });

//     const fullPost = await Post.findOne({
//       where: { id: post.id },
//       include: [
//         {
//           model: Image,
//         },
//         {
//           model: Comment,
//           include: [
//             {
//               model: User, // 댓글 작성자
//               attributes: ["id", "nickname"],
//             },
//           ],
//         },
//         {
//           model: User, // 게시글 작성자
//           attributes: ["id", "nickname"],
//         },
//         {
//           model: User, // 좋아요 누른 사람
//           as: "Likers",
//           attributes: ["id"],
//         },
//       ],
//     });
//     res.status(201).json(fullPost);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

router.get("/loadMyInfo", verifyToken, async (req, res, next) => {
  // GET /user/loadMyInfo
  try {
    if (req.userid) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.userid },
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
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
