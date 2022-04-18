const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Likecomment extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      name: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, {
      modelName: 'Likecomment',
      tableName: 'likecomments',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 이모티콘 저장
      sequelize,
    });
  }
  static associate(db) {
    db.Likecomment.belongsTo(db.User);
    db.Likecomment.belongsTo(db.Post);
    db.Likecomment.belongsTo(db.Comment);
  }
};
