const Sequelize = require('sequelize');

class CommunityDetail extends Sequelize.Model {
  static initiate(sequelize) {
    CommunityDetail.init(
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
        modelName: 'CommunityDetail',
        tableName: 'community_details',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.CommunityDetail.belongsTo(db.Post);
  }
}

module.exports = CommunityDetail;
