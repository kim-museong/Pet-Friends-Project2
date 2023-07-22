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
const { sequelize } = require('../models');

///////////////////////////////////////////////////////
//////////////////// create reply /////////////////////
///////////////////////////////////////////////////////
exports.createReply = async (req, res, next) => {
  const { parentCommentId } = req.params;
  const { content, postId } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // 1. create reply
    if (parentCommentId) {
      const reply = await Reply.create(
        {
          content,
          UserId: req.user.id,
          CommentId: parentCommentId,
          likeCount: 0,
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
      return res.status(404).json({ error: 'comment not found' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};

//////////////////////////////////////////////////////
//////////////////// get replies /////////////////////
//////////////////////////////////////////////////////
exports.getReplies = async (req, res, next) => {
  console.log('get replies');

  const { parentCommentId } = req.params;

  const transaction = await sequelize.transaction();

  try {
    // 1. get reply list
    if (parentCommentId) {
      const replies = await Reply.findAll({
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
        ],
        where: { CommentId: parentCommentId },
        paranoid: false,
        transaction,
      });
      // transaction commit
      await transaction.commit();

      // const formattedData = {
      //   commentId: parentCommentId,
      //   replies,
      // };

      // console.log(formattedData);
      return res.status(200).json(replies);
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

///////////////////////////////////////////////////////
//////////////////// delete reply /////////////////////
///////////////////////////////////////////////////////
exports.deleteReply = async (req, res, next) => {
  const { commentId, replyId } = req.params;
  const { postId } = req.query;
  console.log(postId, commentId, replyId);

  const transaction = await sequelize.transaction();

  try {
    // 1. delete reply
    if (replyId) {
      await Reply.destroy({
        where: { id: replyId },
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

      console.log(`${commentId} 댓글의 ${replyId}번 대댓글 삭제 성공`);
      res.status(200).json(comments);
    } else {
      return res.status(404).json({ error: 'the replyId is incorrect' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};
