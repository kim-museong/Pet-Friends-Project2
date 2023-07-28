const { faker } = require('@faker-js/faker');
const { Comment, Reply } = require('../models'); // 모델 임포트

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create an array to hold the data for 150 comments and replies
    const commentsData = [];
    const repliesData = [];

    // Generate a random date for the whole data set
    const randomDate = faker.date.past();

    // Generate 150 comments with random content and likeCount values
    for (let i = 0; i < 1500; i++) {
      const randomContent = faker.lorem.sentence();
      const randomLikeCount = Math.floor(Math.random() * 100); // Random value between 0 and 99

      const createdAt = faker.date.between(randomDate, new Date()); // Random date between the dataset date and now

      const comment = {
        content: randomContent,
        likeCount: randomLikeCount,
        createdAt: createdAt,
        updatedAt: createdAt,
        UserId: getRandomUserId(1, 5), // Replace with the appropriate range for UserId (1~5)
        PostId: getRandomPostId(1, 150), // Replace with the appropriate range for PostId (1~150)
      };

      // Create the comment record in the 'comments' table and get the generated ID
      const createdComment = await Comment.create(comment);

      // Generate replies data and associate with the corresponding comment
      const numReplies = Math.floor(Math.random() * 5); // Generate 0~4 replies for each comment
      for (let j = 0; j < numReplies; j++) {
        const randomReplyContent = faker.lorem.sentence();
        const randomReplyLikeCount = Math.floor(Math.random() * 100); // Random value between 0 and 99

        const replyCreatedAt = faker.date.between(createdAt, new Date()); // Random date between the comment's createdAt and now

        const reply = {
          content: randomReplyContent,
          likeCount: randomReplyLikeCount,
          createdAt: replyCreatedAt,
          updatedAt: replyCreatedAt,
          UserId: getRandomUserId(1, 5), // Replace with the appropriate range for UserId (1~5)
          CommentId: createdComment.id,
        };

        // Push reply data to the array
        repliesData.push(reply);
      }
    }

    // Bulk insert the comments data into the 'comments' table
    await Comment.bulkCreate(commentsData);

    // Bulk insert the replies data into the 'replies' table
    await Reply.bulkCreate(repliesData);
  },

  async down(queryInterface, Sequelize) {
    // Remove all the data inserted by the Seeder (not needed for this example)
    await Comment.destroy({ where: {}, truncate: true });
    await Reply.destroy({ where: {}, truncate: true });
  },
};

// Helper functions to generate random UserId and PostId
function getRandomUserId(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomPostId(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
