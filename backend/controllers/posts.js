const { Post, User, Board, Content } = require('../models');

// read pictures
exports.readPicture = (req, res, next) => {
  const { sortType, limit } = req.query;
  const { boardName } = req.params;
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
