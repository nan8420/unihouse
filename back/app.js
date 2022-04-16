const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
