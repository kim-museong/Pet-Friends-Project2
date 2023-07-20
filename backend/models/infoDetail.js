const Sequelize = require('sequelize');

class InfoDetail extends Sequelize.Model {
  static initiate(sequelize) {
    InfoDetail.init(
      {
        title: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'InfoDetail',
        tableName: 'info_details',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.InfoDetail.belongsTo(db.Post);
  }
}

module.exports = InfoDetail;
