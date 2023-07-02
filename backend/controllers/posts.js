const { Post, User, Board, Content } = require('../models');

// read pictures
exports.readPicture = (req, res, next) => {
  const limit = 4; // 클라이언트에서 요청한 값으로 대체
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ['userId', 'nickname'],
      },
      {
        model: Board,
        attributes: ['name'],
        where: { name: 'picture' },
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
    order: [['createdAt', 'DESC']],
    limit,
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
