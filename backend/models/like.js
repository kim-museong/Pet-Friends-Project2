const Sequelize = require('sequelize');

class Like extends Sequelize.Model {
  static initiate(sequelize) {
    Like.init(
      {
        likable_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        likable_type: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Like',
        tableName: 'likes',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.User);
    db.Like.belongsTo(db.Post);
  }
}

module.exports = Like;
