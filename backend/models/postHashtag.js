const Sequelize = require('sequelize');

class PostHashtag extends Sequelize.Model {
  static initiate(sequelize) {
    PostHashtag.init(
      {},
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'PostHashtag',
        tableName: 'posthashtags',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.PostHashtag.belongsTo(db.Post);
    db.PostHashtag.belongsTo(db.Hashtag);
  }
}

module.exports = PostHashtag;
