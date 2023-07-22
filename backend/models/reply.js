const Sequelize = require('sequelize');

class Reply extends Sequelize.Model {
  static initiate(sequelize) {
    Reply.init(
      {
        content: {
          type: Sequelize.STRING(5000),
          allowNull: false,
        },
        likeCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Reply',
        tableName: 'replies',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Reply.belongsTo(db.User);
    db.Reply.belongsTo(db.Comment);
  }
}

module.exports = Reply;
