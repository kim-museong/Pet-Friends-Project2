const Sequelize = require('sequelize');

class Like extends Sequelize.Model {
  static initiate(sequelize) {
    Like.init(
      {
        likable_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'compositeIndex',
        },
        likable_type: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: 'compositeIndex',
        },
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'compositeIndex',
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          unique: 'compositeIndex',
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
        indexes: [
          {
            name: 'compositeIndex',
            unique: true,
            fields: ['UserId', 'likable_id', 'likable_type', 'deletedAt'],
          },
        ],
      },
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.User);
    db.Like.belongsTo(db.Post);
  }
}

module.exports = Like;
