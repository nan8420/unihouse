const jwt = require("jsonwebtoken");

require("dotenv").config();

// 포트폴리오를 위해 .env 의도적으로 깃헙에 올림

exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }
  try {
    const data = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      process.env.ACCESS_TOKEN_SECRET
      // JWtAccessToken // (더미데이터 용) 실제는 꼭 위에 코드처럼 Process.env에 암호화 시켜서 적용하기
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
    // console.log(" 리프레시  req.headers:", req.headers);

    const data = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      process.env.REFRESH_TOKEN_SECRET
      // JWTRefreshToken // (더미데이터 용) 실제는 꼭  위에 코드처럼 Process.env에 암호화 시켜서 적용하기
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
