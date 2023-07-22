const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        view: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
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
        modelName: 'Post',
        tableName: 'posts',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Like);
    db.Post.hasOne(db.Content);
    db.Post.hasOne(db.CommunityDetail);
    db.Post.hasOne(db.PictureDetail);
    db.Post.hasOne(db.NoticeDetail);
    db.Post.hasOne(db.InfoDetail);
    db.Post.belongsTo(db.Board);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
}

module.exports = Post;
