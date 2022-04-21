const jwt = require("jsonwebtoken");

require("dotenv").config();

// const jwtSecret = "JWT_SECRET";

exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }
  try {
    // console.log(" 엑세스  req.headers:", req.headers);

    const data = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      process.env.ACCESS_TOKEN_SECRET
      //   jwtSecret
    );
    req.userid = data.userId;
    // res.locals.userid = data.userId;
    res.locals.email = data.email;
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

exports.verifyRefreshToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }
  try {
    // console.log("22222222222222222");
    console.log(" 리프레시  req.headers:", req.headers);

    const data = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      process.env.REFRESH_TOKEN_SECRET
      //   jwtSecret
    );
    req.userid = data.userId;
    res.locals.email = data.email;
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      console.log("리프레시토근 만료");
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
