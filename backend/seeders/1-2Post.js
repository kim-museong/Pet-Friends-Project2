'use strict';
const { faker } = require('@faker-js/faker');
// const { fakerKO: faker } = require('@faker-js/faker');
const { Post, CommunityDetail, Content } = require('../models'); // 모델 임포트

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create an array to hold the data for 155 posts, community_details, and contents
    const postsData = [];
    const communityDetailsData = [];
    const contentsData = [];

    // Generate a random date for the whole data set
    const randomDate = faker.date.past();

    // Generate 155 posts with random view and likeCount values
    for (let i = 0; i < 155; i++) {
      const randomView = Math.floor(Math.random() * 1000); // Random value between 0 and 999
      const randomLikeCount = Math.floor(Math.random() * 100); // Random value between 0 and 99

      const createdAt = faker.date.between(randomDate, new Date()); // Random date between the dataset date and now

      const post = {
        view: randomView,
        likeCount: randomLikeCount,
        createdAt: createdAt,
        updatedAt: createdAt,
        BoardId: 3, // Replace with the appropriate BoardId
        UserId: 1, // Replace with the appropriate UserId
      };

      // Create the post record in the 'posts' table and get the generated ID
      const createdPost = await Post.create(post);

      // Generate community_details data and associate with the corresponding post
      const communityDetail = {
        title: faker.word.sample(), // Replace with the actual field in community_details
        PostId: createdPost.id,
        createdAt: createdAt,
        updatedAt: createdAt,
      };

      // Push communityDetail data to the array
      communityDetailsData.push(communityDetail);

      // Generate content data and associate with the corresponding post
      const content = {
        content: faker.lorem.paragraphs(), // Replace with the actual field in contents
        PostId: createdPost.id,
        createdAt: createdAt,
        updatedAt: createdAt,
      };

      // Push content data to the array
      contentsData.push(content);
    }

    // Bulk insert the community_details data into the 'community_details' table
    await CommunityDetail.bulkCreate(communityDetailsData);

    // Bulk insert the contents data into the 'contents' table
    await Content.bulkCreate(contentsData);
  },
};
