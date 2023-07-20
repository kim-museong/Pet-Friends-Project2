const Sequelize = require('sequelize');

class Memo extends Sequelize.Model {
  static initiate(sequelize) {
    Memo.init(
      {
        content: {
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Memo',
        tableName: 'memos',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Memo.belongsTo(db.User);
  }
}

module.exports = Memo;
