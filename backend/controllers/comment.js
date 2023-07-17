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
  CommunityInfo,
  PictureInfo,
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

      // transaction commit
      await transaction.commit();

      return res.status(200).json(comment);
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
        where: { PostId: postId },
        transaction,
      });
      // transaction commit
      await transaction.commit();

      console.log(comments);
      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ error: 'comment not found' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};
