const Sequelize = require('sequelize');

class Like extends Sequelize.Model {
  static initiate(sequelize) {
    Like.init(
      {},
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Like',
        tableName: 'likes',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.User);
    db.Like.belongsTo(db.Post);
    db.Like.belongsTo(db.Picture);
    db.Like.belongsTo(db.Comment);
    db.Like.belongsTo(db.Reply);
  }
}

module.exports = Like;
