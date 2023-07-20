const Sequelize = require('sequelize');

class NoticeDetail extends Sequelize.Model {
  static initiate(sequelize) {
    NoticeDetail.init(
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
        modelName: 'NoticeDetail',
        tableName: 'notice_details',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.NoticeDetail.belongsTo(db.Post);
  }
}

module.exports = NoticeDetail;
