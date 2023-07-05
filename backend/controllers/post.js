const { Post, User, Board, Content, Comment, Like } = require('../models');

// read picture list
exports.readPictureList = (req, res, next) => {
  const { sortType, limit } = req.query;
  const { boardName } = req.params;
  console.log(sortType, limit, boardName);
  let column = 'createdAt';
  let order = 'DESC';
  switch (sortType) {
    case 'newest':
      column = 'createdAt';
      order = 'DESC';
      break;
    case 'oldest':
      column = 'createdAt';
      order = 'ASC';
      break;
    case 'highestViews':
      column = 'view';
      order = 'DESC';
      break;
    case 'lowestViews':
      column = 'view';
      order = 'ASC';
      break;
    default:
      column = 'createdAt';
      order = 'DESC';
      break;
  }

  Post.findAll({
    include: [
      {
        model: User,
        attributes: ['userId', 'nickname'],
      },
      {
        model: Board,
        attributes: ['name'],
        where: { name: boardName },
      },
      {
        model: Content,
        attributes: ['content'],
      },
      // {
      //   model: Like,
      //   attributes: ["UserId", "PostId"],
      // },
    ],
    order: [[column, order]],
    limit: parseInt(limit),
  })
    .then((data) => {
      const pictures = data.map((item) => item.dataValues);
      // 필요한 정보만 가공해서 주도록 수정
      res.json(pictures);
    })
    .catch((err) => {
      console.error(err);
    });
};

// read post
exports.readPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    // 게시글 정보 가져옴
    const post = await Post.findOne({
      include: [
        {
          model: User,
          attributes: ['id', 'userId', 'nickname'],
        },
        {
          model: Board,
          attributes: ['name'],
        },
        {
          model: Content,
          attributes: ['content'],
        },
      ],
      where: {
        id: postId,
      },
    });

    // 댓글 정보 가져옴
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'userId', 'nickname'],
        },
        {
          model: Post,
          attributes: ['id'],
          where: { id: postId },
        },
      ],
    });

    // 추천 정보 가져옴
    const likeCount = await Like.count({
      where: { PostId: postId },
    });
    // 댓글 개수
    const commentCount = await Comment.count({
      where: { PostId: post.id },
    });

    // 해당 게시글의 조회수 +1 처리
    await Post.update(
      {
        view: post.view + 1,
      },
      {
        where: { id: postId },
      },
    );
    // findOne으로 가져왔던 post의 조회수도 +1로 갱신
    post.view += 1;

    const data = {
      post: post.dataValues,
      comments: comments.map((item) => item.dataValues),
      likeCount,
      commentCount,
    };
    res.json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
