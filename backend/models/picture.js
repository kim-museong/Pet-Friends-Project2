const Sequelize = require('sequelize');

class Picture extends Sequelize.Model {
  static initiate(sequelize) {
    Picture.init(
      {
        // 좋아요 숫자 카운트 하는 칼럼 필요할 수도 있음(성능문제)
        view: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        imgUrl: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Picture',
        tableName: 'pictures',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Picture.belongsTo(db.User);
    db.Picture.hasMany(db.Like);
    db.Picture.hasMany(db.Comment);
    db.Picture.hasOne(db.Content);
    db.Picture.belongsTo(db.Board);
    db.Picture.belongsToMany(db.Hashtag, { through: 'PictureHashtag' });
  }
}

module.exports = Picture;
