const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  console.log("/user!!!!");
  console.log("req.body:", req.body);
});

module.exports = router;
