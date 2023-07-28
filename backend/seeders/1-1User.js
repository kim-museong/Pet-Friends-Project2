const { User } = require('../models'); // 모델 임포트

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Generate an array to hold the data for 5 users
    const usersData = [];

    // User information
    const userIds = ['qwevqwev1', 'qwevqwev2', 'qwevqwev3', 'qwevqwev4', 'qwevqwev5'];
    const nickname = userIds;
    const emailDomain = '@naver.com';
    const provider = 'local';
    const rank = 'member';
    const phone = '01011112222';
    const password = '$2b$12$1vJfZeT/NIcCEGs0ZKUEhuuy6m2DZgxfeBa62HhKtNiUGIiv.kuOe'; // Same password for all users

    // Generate 5 users with the provided information
    for (let i = 0; i < 5; i++) {
      const user = {
        userId: userIds[i],
        password: password,
        nickname: nickname[i],
        email: userIds[i] + emailDomain,
        provider: provider,
        rank: rank,
        phone: phone,
        isAttendance: false,
        attendanceNumber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Push user data to the array
      usersData.push(user);
    }

    // Bulk insert the users data into the 'users' table
    await User.bulkCreate(usersData);
  },

  async down(queryInterface, Sequelize) {
    // Remove all the data inserted by the Seeder (not needed for this example)
    await User.destroy({ where: {}, truncate: true });
  },
};
