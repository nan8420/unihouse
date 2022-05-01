const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "root",
    // password: process.env.DB_PASSWORD,
    password: "111111", // 꼭 Process.env에 암호화 시켜서 적용하기 위에 코드처럼 (더미데이터 용)
    database: "unihouse",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "unihouse",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "unihouse",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
