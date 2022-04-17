const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res, next) => {
  console.log("/user!!!!");
});

module.exports = router;
