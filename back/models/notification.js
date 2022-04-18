const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Notification extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        active: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        modelName: "Notification",
        tableName: "notifications",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Notification.belongsTo(db.User);
    db.Notification.belongsTo(db.Post);
    db.Notification.belongsTo(db.Comment);
  }
};
