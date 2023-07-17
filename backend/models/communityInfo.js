const Sequelize = require('sequelize');

class CommunityInfo extends Sequelize.Model {
  static initiate(sequelize) {
    CommunityInfo.init(
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
        modelName: 'CommunityInfo',
        tableName: 'community_infos',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.CommunityInfo.belongsTo(db.Post);
  }
}

module.exports = CommunityInfo;
