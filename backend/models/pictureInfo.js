const Sequelize = require('sequelize');

class PictureInfo extends Sequelize.Model {
  static initiate(sequelize) {
    PictureInfo.init(
      {
        imgUrl: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'PictureInfo',
        tableName: 'picture_infos',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.PictureInfo.belongsTo(db.Post);
  }
}

module.exports = PictureInfo;
