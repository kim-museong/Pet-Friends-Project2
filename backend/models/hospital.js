const Sequelize = require('sequelize');

class Hospital extends Sequelize.Model {
  static initiate(sequelize) {
    Hospital.init(
      {
        district_name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        registration_number: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        company_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        report_date: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        latitude: {
          type: Sequelize.DECIMAL(9, 6),
          allowNull: true,
        },
        longitude: {
          type: Sequelize.DECIMAL(9, 6),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Hospital',
        tableName: 'hospitals',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {}
}

module.exports = Hospital;
