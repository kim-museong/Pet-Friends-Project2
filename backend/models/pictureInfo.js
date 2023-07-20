const Sequelize = require('sequelize');

class PictureDetail extends Sequelize.Model {
  static initiate(sequelize) {
    PictureDetail.init(
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
        modelName: 'PictureDetail',
        tableName: 'picture_details',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.PictureDetail.belongsTo(db.Post);
  }
}

module.exports = PictureDetail;
