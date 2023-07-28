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

///////////////////////////////////////////////////
//////////////////// add like /////////////////////
///////////////////////////////////////////////////
exports.addLike = async (req, res, next) => {
  const { userId = null, postId = null } = req.params;
  const { type = '', targetId = null } = req.body;

  console.log(userId, postId, type, targetId);

  const transaction = await sequelize.transaction();

  try {
    // 1. create like
    if (userId && postId && targetId) {
      const like = await Like.create(
        {
          likable_id: targetId,
          likable_type: type,
          UserId: userId,
          PostId: postId,
        },
        { transaction },
      );
      // 2. update likeCount
      const query = {
        by: 1,
        where: {
          id: targetId,
        },
        transaction,
      };
      if (type === 'post') {
        await Post.increment('likeCount', query);
      } else if (type === 'comment') {
        await Comment.increment('likeCount', query);
      } else if (type === 'reply') {
        await Reply.increment('likeCount', query);
      }
      // 3. get target(post, comment, reply) list
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

      await transaction.commit();

      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ error: 'missing required information' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    next(error);
  }
};
///////////////////////////////////////////////////
//////////////////// get likes /////////////////////
///////////////////////////////////////////////////
exports.getLikes = async (req, res, next) => {
  const { userId = null } = req.params;
  const { postId = null } = req.query;

  console.log(userId, postId);

  const transaction = await sequelize.transaction();

  try {
    // 1. get likes
    if (userId !== null && postId !== null) {
      const likes = await Like.findAll(
        {},
        {
          where: {
            UserId: userId,
            PostId: postId,
          },
          transaction,
        },
      );
      // transaction commit
      await transaction.commit();

      return res.status(200).json(likes);
    } else if (userId !== null && postId === null) {
      const likes = await Like.findAll(
        {},
        {
          where: {
            UserId: userId,
          },
          transaction,
        },
      );
      // transaction commit
      await transaction.commit();

      return res.status(200).json(likes);
    } else {
      return res.status(404).json({ error: 'missing required information' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};

//////////////////////////////////////////////////////
//////////////////// delete like /////////////////////
//////////////////////////////////////////////////////
exports.deleteLike = async (req, res, next) => {
  const { userId } = req.params;
  const { likableType, likableId, postId } = req.query;

  const transaction = await sequelize.transaction();

  try {
    // 1. delete like
    const like = await Like.destroy({
      where: {
        UserId: userId,
        likable_type: likableType,
        likable_id: likableId,
      },
      transaction,
    });
    console.log(`유저 ${userId}의 ${likableId}번 ${likableType} 삭제 성공`);
    // 2. update likeCount
    const query = {
      by: 1,
      where: {
        id: likableId,
      },
      transaction,
    };
    if (likableType === 'post') {
      await Post.decrement('likeCount', query);
    } else if (likableType === 'comment') {
      await Comment.decrement('likeCount', query);
    } else if (likableType === 'reply') {
      await Reply.decrement('likeCount', query);
    }

    // 3. get target(post, comment, reply) list
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

    res.status(200).json(comments);
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};

////////////////////////////////////////////////////////
//////////////////// add like TEST /////////////////////
////////////////////////////////////////////////////////
exports.addLikeTEST = async (req, res, next) => {
  const { userId } = req.params;
  const { postId = null, targetType, targetId } = req.body;
  console.log('---------------------------------------------------------');
  console.log('add like TEST', userId, postId, targetType, targetId);
  console.log('---------------------------------------------------------');

  const transaction = await sequelize.transaction();

  try {
    // 1. add like
    const like = await Like.create(
      {
        UserId: userId,
        PostId: postId,
        likable_type: targetType,
        likable_id: targetId,
      },
      { transaction },
    );
    // 2. update likeCount
    const query = {
      by: 1,
      where: {
        id: targetId,
      },
      transaction,
    };
    if (targetType === 'post') {
      await Post.increment('likeCount', query);
    } else if (targetType === 'comment') {
      await Comment.increment('likeCount', query);
    } else if (targetType === 'reply') {
      await Reply.increment('likeCount', query);
    }
    // 3. get likes
    if (userId !== null && postId !== null) {
      const likes = await Like.findAll({
        // where: {
        //   PostId: postId,
        // },
        transaction,
      });
      // transaction commit
      await transaction.commit();

      console.log(`유저 ${userId}의 ${targetId}번 ${targetType} 추천 성공`);
      console.log(likes);
      res.status(200).json(likes);
    } else if (userId !== null && postId === null) {
      const likes = await Like.findAll({
        transaction,
      });
      // transaction commit
      await transaction.commit();

      console.log(`유저 ${userId}의 ${targetId}번 ${targetType} 추천 성공`);
      console.log(likes);
      res.status(200).json(likes);
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};

///////////////////////////////////////////////////////////
//////////////////// delete like TEST /////////////////////
///////////////////////////////////////////////////////////
exports.deleteLikeTEST = async (req, res, next) => {
  const { userId } = req.params;
  const { targetType, targetId, postId } = req.query;
  console.log(userId, targetType, targetId, postId);

  const transaction = await sequelize.transaction();

  try {
    // 1. delete like
    const like = await Like.destroy({
      where: {
        UserId: userId,
        likable_type: targetType,
        likable_id: targetId,
        PostId: postId,
      },
      transaction,
    });
    // 2. update likeCount
    const query = {
      by: 1,
      where: {
        id: targetId,
      },
      transaction,
    };
    if (targetType === 'post') {
      await Post.decrement('likeCount', query);
    } else if (targetType === 'comment') {
      await Comment.decrement('likeCount', query);
    } else if (targetType === 'reply') {
      await Reply.decrement('likeCount', query);
    }
    // 3. get likes
    const likes = await Like.findAll({
      // where: {
      //   PostId: postId,
      // },
      transaction,
    });

    // transaction commit
    await transaction.commit();

    console.log(`유저 ${userId}의 ${targetId}번 ${targetType} 추천해제 성공`);
    console.log(likes);
    res.status(200).json(likes);
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
