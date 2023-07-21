const {
  Post,
  User,
  Board,
  Content,
  Comment,
  Like,
  Hashtag,
  PostHashtag,
  Reply,
  CommunityDetail,
  PictureDetail,
} = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../models');

/////////////////////////////////////////////////////////
//////////////////// create comment /////////////////////
/////////////////////////////////////////////////////////
exports.createComment = async (req, res, next) => {
  const { postId } = req.params;
  const { content = '' } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // 1. create comment
    if (postId) {
      const comment = await Comment.create(
        {
          content,
          UserId: req.user.id,
          PostId: postId,
        },
        { transaction },
      );

      // 2. get comments
      const comments = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
          {
            model: Reply,
            include: [
              {
                model: User,
                attributes: ['nickname'],
              },
            ],
            paranoid: false,
          },
        ],
        where: { PostId: postId },
        paranoid: false,
        transaction,
      });

      // transaction commit
      await transaction.commit();

      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ error: 'post not found' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};

//////////////////////////////////////////////////////
//////////////////// get comment /////////////////////
//////////////////////////////////////////////////////
exports.getComments = async (req, res, next) => {
  const { postId } = req.params;

  const transaction = await sequelize.transaction();

  try {
    // 1. get comment list
    if (postId) {
      const comments = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
          {
            model: Reply,
            include: [
              {
                model: User,
                attributes: ['nickname'],
              },
            ],
            paranoid: false,
          },
        ],
        where: { PostId: postId },
        paranoid: false,
        transaction,
      });
      // transaction commit
      await transaction.commit();

      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ error: 'post not found' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};

/////////////////////////////////////////////////////////
//////////////////// delete comment /////////////////////
/////////////////////////////////////////////////////////
exports.deleteComment = async (req, res, next) => {
  console.log('댓글 삭제 진입');
  const { postId, commentId } = req.params;

  const transaction = await sequelize.transaction();

  try {
    // 1. delete comment
    if (commentId) {
      await Comment.destroy({
        where: { id: commentId },
        transaction,
      });

      // 2. get comments
      const comments = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
          {
            model: Reply,
            include: [
              {
                model: User,
                attributes: ['nickname'],
              },
            ],
            paranoid: false,
          },
        ],
        where: { PostId: postId },
        paranoid: false,
        transaction,
      });

      // transaction commit
      await transaction.commit();

      console.log(`${postId} 게시글의 ${commentId}번 댓글 삭제 성공`);
      res.status(200).json(comments);
    } else {
      return res.status(404).json({ error: 'the commentId is incorrect' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};
