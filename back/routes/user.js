// 포트폴리오를 위해 .env 의도적으로 깃헙에 올림

const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post, Image, Comment, Notification } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, verifyRefreshToken } = require("./middlewares");

router.post("/refreshToken", verifyRefreshToken, async (req, res, next) => {
  try {
    const accessToken = jwt.sign(
      { sub: "access", email: res.locals.email, userId: req.userid },

      process.env.ACCESS_TOKEN_SECRET,
      // JWtAccessToken, // (더미데이터 용) 실제는 위에 코드처럼 꼭 Process.env에 암호화 시켜서 적용하기
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
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  "/refreshRefreshToken",
  verifyRefreshToken,
  async (req, res, next) => {
    try {
      const refreshToken = jwt.sign(
        //추가한 부분
        { sub: "refresh", email: res.locals.email, userId: req.userid },
        process.env.REFRESH_TOKEN_SECRET,
        // JWTRefreshToken, // (더미데이터 용) 실제는 위에 코드처럼 꼭 Process.env에 암호화 시켜서 적용하기
        // { expiresIn: "60s" }
        { expiresIn: "24h" }
      );

      const user = await User.findOne({
        where: { email: res.locals.email },
      });

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
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(401).json({ message: "가입하지 않은 회원입니다." });
    }

    const passowrdsucess = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passowrdsucess) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다" });
    }

    const accessToken = jwt.sign(
      { sub: "access", email: req.body.email, userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      // JWtAccessToken, // (더미데이터 용) 실제는 위에 코드처럼 꼭 Process.env에 암호화 시켜서 적용하기
      { expiresIn: "30m" }
      // { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { sub: "refresh", email: req.body.email, userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      // JWTRefreshToken, // (더미데이터 용) 실제는 위에 코드처럼 꼭 Process.env에 암호화 시켜서 적용하기
      { expiresIn: "24h" }
      // { expiresIn: "60s" }
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

    return res.status(200).json({
      user: fulluser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
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

// const express = require("express");
// const bcrypt = require("bcrypt");
// const { User, Post, Image, Comment, Notification } = require("../models");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const { verifyToken, verifyRefreshToken } = require("./middlewares");

// const JWtAccessToken = "JWT_accessToken";
// const JWTRefreshToken = "JWT.refreshToken";
// // (더미데이터 용) 실제는 꼭 Process.env에 암호화 시켜서 적용하기 위에 코드처럼

// router.post("/refreshToken", verifyRefreshToken, async (req, res, next) => {
//   const accessToken = jwt.sign(
//     { sub: "access", email: res.locals.email, userId: req.userid },

//     // process.env.ACCESS_TOKEN_SECRET,
//     JWtAccessToken, // (더미데이터 용) 실제는 위에 코드처럼 꼭 Process.env에 암호화 시켜서 적용하기
//     { expiresIn: "30m" }
//     // { expiresIn: "30s" }
//   );

//   const user = await User.findOne({
//     where: { email: res.locals.email },
//   });

//   if (!user) {
//     return res.status(404).json({ message: "가입되지 않은 회원입니다." });
//   }
//   res.json({
//     data: {
//       accessToken,
//       email: res.locals.email,
//       // name: users[res.locals.email].name,
//     },
//   });
// });

// router.post(
//   "/refreshRefreshToken",
//   verifyRefreshToken,
//   async (req, res, next) => {
//     const refreshToken = jwt.sign(
//       //추가한 부분
//       { sub: "refresh", email: res.locals.email, userId: req.userid },
//       // process.env.REFRESH_TOKEN_SECRET,
//       JWTRefreshToken, // (더미데이터 용) 실제는 위에 코드처럼 꼭 Process.env에 암호화 시켜서 적용하기
//       // { expiresIn: "60s" }
//       { expiresIn: "24h" }
//     );

//     const user = await User.findOne({
//       where: { email: res.locals.email },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "가입되지 않은 회원입니다." });
//     }
//     // if (!users[res.locals.email]) {
//     //   return res.status(404).json({ message: "가입되지 않은 회원입니다." });
//     // }
//     // console.log("refreshToken:::", refreshToken);
//     res.json({
//       data: {
//         refreshToken, // 추가한 부분
//       },
//     });
//   }
// );

// router.post("/login", async (req, res, next) => {
//   const user = await User.findOne({
//     where: { email: req.body.email },
//   });

//   if (!user) {
//     return res.status(401).json({ message: "가입하지 않은 회원입니다." });
//   }

//   const passowrdsucess = await bcrypt.compare(req.body.password, user.password);

//   if (!passowrdsucess) {
//     return res.status(401).json({ message: "비밀번호가 틀렸습니다" });
//   }

//   const accessToken = jwt.sign(
//     { sub: "access", email: req.body.email, userId: user.id },
//     // process.env.ACCESS_TOKEN_SECRET,
//     JWtAccessToken, // (더미데이터 용) 실제는 위에 코드처럼 꼭 Process.env에 암호화 시켜서 적용하기
//     { expiresIn: "30m" }
//     // { expiresIn: "30s" }
//   );
//   const refreshToken = jwt.sign(
//     { sub: "refresh", email: req.body.email, userId: user.id },
//     // process.env.REFRESH_TOKEN_SECRET,
//     JWTRefreshToken, // (더미데이터 용) 실제는 위에 코드처럼 꼭 Process.env에 암호화 시켜서 적용하기
//     { expiresIn: "24h" }
//     // { expiresIn: "60s" }
//   );

//   const fulluser = await User.findOne({
//     where: { id: user.id },
//     attributes: {
//       exclude: ["password"],
//     },
//     include: [
//       {
//         model: Post,
//         attributes: ["id"],
//       },
//     ],
//   });

//   return res.status(200).json({
//     user: fulluser,
//     accessToken: accessToken,
//     refreshToken: refreshToken,
//   });
// });

// router.post("/signup", async (req, res, next) => {
//   try {
//     const exUser = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     if (exUser) {
//       return res.status(403).send("이미 사용 중인 아이디 입니다!");
//     }
//     const hashedPassword = await bcrypt.hash(req.body.password, 12);
//     await User.create({
//       email: req.body.email,
//       nickname: req.body.nickname,
//       password: hashedPassword,
//       univ: req.body.univ,
//     });
//     res.status(201).send("ok");
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// router.get("/loadMyInfo", verifyToken, async (req, res, next) => {
//   // GET /user/loadMyInfo
//   try {
//     if (req.userid) {
//       const fullUserWithoutPassword = await User.findOne({
//         where: { id: req.userid },
//         attributes: {
//           exclude: ["password"],
//         },
//         include: [
//           {
//             model: Post,
//             attributes: ["id"],
//           },
//         ],
//       });
//       res.status(200).json(fullUserWithoutPassword);
//     } else {
//       res.status(200).json(null);
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// module.exports = router;
