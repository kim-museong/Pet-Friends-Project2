const { Post, User, Board, Content, Comment, Like } = require('../models');
const { Op } = require('sequelize');

// read post list
exports.readPosts = (req, res, next) => {
  const { searchCategory = '', searchKeyword = '', sortType = 'newest', currPageNum = 1, limit = 10 } = req.query;
  const { boardName } = req.params;

  // 클라이언트에서 받은 query, params SQL 조회용으로 재가공
  const sortOptions = {
    newest: { column: 'createdAt', order: 'DESC' },
    oldest: { column: 'createdAt', order: 'ASC' },
    highestViews: { column: 'view', order: 'DESC' },
    lowestViews: { column: 'view', order: 'ASC' },
  };
  const searchOptions = {
    titleDetail: { title: searchKeyword, content: searchKeyword, nickname: '' },
    title: { title: searchKeyword, content: '', nickname: '' },
    nickname: { title: '', content: '', nickname: searchKeyword },
  };
  const { title, content, nickname } = searchOptions[searchCategory] || { title: '', content: '', nickname: '' };
  const { column, order } = sortOptions[sortType] || sortOptions.newest;

  const offset = (parseInt(currPageNum) - 1) * parseInt(limit);

  let querySQL = {};
  if (searchCategory === 'titleDetail' && searchKeyword !== '') {
    querySQL = {
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
        },
        {
          model: Like,
          attributes: ['UserId', 'PostId'],
        },
      ],
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${title}}%` } }, { '$Content.content$': { [Op.like]: `%${content}%` } }],
      },
      offset: offset,
      order: [[column, order]],
      limit: parseInt(limit),
      subQuery: false, // limit 넣으면 에러 나는거 수정하기 위한 부분
    };
  } else if (searchCategory === 'title' && searchKeyword !== '') {
    querySQL = {
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
        {
          model: Like,
          attributes: ['UserId', 'PostId'],
        },
      ],
      where: { title: { [Op.like]: `%${title}%` } },
      offset: offset,
      order: [[column, order]],
      limit: parseInt(limit),
    };
  } else if (searchCategory === 'nickname' && searchKeyword !== '') {
    querySQL = {
      include: [
        {
          model: User,
          attributes: ['userId', 'nickname'],
          where: { nickname: nickname },
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
        {
          model: Like,
          attributes: ['UserId', 'PostId'],
        },
      ],
      offset: offset,
      order: [[column, order]],
      limit: parseInt(limit),
    };
  } else {
    querySQL = {
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
        {
          model: Like,
          attributes: ['UserId', 'PostId'],
        },
      ],
      offset: offset,
      order: [[column, order]],
      limit: parseInt(limit),
    };
  }

  Post.findAndCountAll(querySQL)
    .then((data) => {
      const formattedData = {
        postCount: data.count,
        posts: data.rows.map((post) => post.dataValues),
      };
      // 필요한 정보만 가공해서 주도록 수정
      console.log(formattedData.posts.length);
      res.json(formattedData);
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

// delete post
exports.deletePost = (req, res, next) => {
  // boardName은 추후 사진게시글, 일반게시글 분리시 사용
  const { boardName, postId } = req.params;

  Post.destroy({
    where: { id: postId },
  })
    .then(() => {
      console.log(`${boardName}게시판의 ${postId}번 게시글 삭제 성공`);
      res.status(200).end();
    })
    .catch((error) => {
      console.log('게시글 삭제 중 오류 발생');
      console.log(error);
      next(error);
    });

  // DB에서 물리적인 삭제가 아닌 deleteAt을 통한 논리적인 삭제 방식이
  // 적용되어있기 때문에 posts 테이블과 연관된 테이블들의 데이터 삭제를
  // 위해서는 수동으로 찾아서 삭제해줄 필요가 있다.
  // 이 과정에서 일부 작업만 성공하고 끝나버리는 문제를 막기 위해
  // 트랜잭션을 도입해서 처리해야한다.
  // 혹은 물리적인 삭제로 변경해야한다. 이 경우 삭제된 정보 복구를 위해서는
  // 삭제와 동시에 백업용 테이블에 정보를 옮겨둘 필요가 있다.

  // 지금은 paranoid: false로 변경해 물리적 삭제로 변경해서 문제를 해결
};

// update post
exports.updatePost = async (req, res, next) => {
  const { boardName, postId } = req.params;
  const { title, content } = req.body;
  console.log('boardName, postId, title, content', boardName, postId, title, content);

  try {
    // posts 테이블 데이터 update
    const post = await Post.update(
      {
        title: title,
        updatedAt: new Date(),
      },
      {
        where: { id: postId },
      },
    );
    console.log('post', post);
    // TODO : .update의 리턴값은 업데이트 성공한 row 갯수
    // TODO : post를 만들어주기 위해서 post 조회할 필요 있음

    // contents 테이블 데이터 update
    const body = await Content.update(
      {
        content: content,
        updatedAt: new Date(),
      },
      {
        where: { PostId: postId },
      },
    );
    console.log('body', body);

    console.log(`${boardName}게시판의 ${postId}번 게시글 수정 성공`);
    return res.status(200).end();
  } catch (error) {
    console.log('게시글 수정중 오류 발생');
    console.log(error);
    next(error);
  }
};

// after upload image
exports.afterUploadImage = (req, res) => {
  res.json({ url: `/img/${req.files[0].filename}` });
};
