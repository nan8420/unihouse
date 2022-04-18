const Sequelize = require("sequelize");
const comment = require("./comment");
const image = require("./image");
const post = require("./post");
const user = require("./user");
const likecomment = require("./likecomment");
const notification = require("./notification");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Comment = comment;
db.Image = image;
db.Post = post;
db.User = user;
db.Likecomment = likecomment;
db.Notification = notification;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;