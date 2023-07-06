const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

class Attendance extends Sequelize.Model {
  static initiate(sequelize) {
    Attendance.init(
      {
        checkInTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Attendance',
        tableName: 'attendances',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Attendance.belongsTo(db.User);
  }
}

module.exports = Attendance;
