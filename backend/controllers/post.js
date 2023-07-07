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

// create post
exports.createPost = async (req, res, next) => {
  const { boardName } = req.params;
  const { title, filteredContent, imgUrl } = req.body;

  try {
    // boardName으로 boardId 찾아서 저장
    const boardId = await Board.findOne({ where: { name: boardName } });

    // DB posts 테이블에 post 저장
    const post = await Post.create({
      title,
      BoardId: boardId.id,
      UserId: req.user.id,
      imgUrl,
    });

    // DB contents 테이블에 filtering된 content 저장
    const contentHTML = await Content.create({
      content: filteredContent,
      PostId: post.id,
    });

    // post 객체에 boardName과 content 정보를 추가
    post.dataValues.boardName = boardId.dataValues.name;
    post.dataValues.content = contentHTML.dataValues.content;

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// after upload image
exports.afterUploadImage = (req, res) => {
  res.json({ url: `/img/${req.files[0].filename}` });
};
