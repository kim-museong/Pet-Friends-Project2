const { Post, User, Board, Content, Comment, Like, Hashtag } = require('../models');
11;
const { Op } = require('sequelize');
const { sequelize } = require('../models');

// read post list
exports.readPosts = (req, res, next) => {
  const {
    searchCategory = '',
    searchKeyword = '',
    sortType = 'newest',
    currPageNum = 1,
    tag = '',
    limit = 10,
  } = req.query;
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
  const querySQL = {
    include: [
      {
        model: User,
        attributes: ['userId', 'nickname', 'rank'],
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
      {
        model: Hashtag,
      },
    ],
    offset: offset,
    order: [[column, order]],
    limit: parseInt(limit),
  };

  // 조건에 따라 querySQL 추가 옵션 지정
  // 태그가 존재함
  if (tag) {
    querySQL.include.find((include) => include.model === Hashtag).where = {
      title: tag,
    };
  }
  // 검색 Keyword가 존재함
  if (searchCategory === 'titleDetail' && searchKeyword !== '') {
    // category : 제목+내용
    querySQL.where = {
      [Op.or]: [{ title: { [Op.like]: `%${title}}%` } }, { '$Content.content$': { [Op.like]: `%${content}%` } }],
    };
    querySQL.subQuery = false;
  } else if (searchCategory === 'title' && searchKeyword !== '') {
    // category : 제목
    querySQL.where = { title: { [Op.like]: `%${title}%` } };
  } else if (searchCategory === 'nickname' && searchKeyword !== '') {
    // category : 닉네임
    querySQL.include.find((include) => include.model === User).where = {
      nickname: nickname,
    };
  }

  Post.findAll(querySQL)
    .then((data) => {
      const formattedData = {
        postCount: data.length,
        posts: data.map((post) => post.dataValues),
      };
      // 필요한 정보만 가공해서 주도록 수정
      // 쿼리문에서 attributes 변경으로 해결
      res.json(formattedData);
    })
    .catch((err) => {
      console.error(err);
    });
};

// read post
exports.readPost = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { postId } = req.params;
  try {
    // 게시글 정보 가져옴
    const post = await Post.findOne({
      include: [
        {
          model: User,
          attributes: ['id', 'userId', 'nickname', 'rank'],
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
      where: { id: postId },
      transaction,
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
      transaction,
    });

    // 해시태그 정보 가져옴
    const postWithHashtag = await Post.findByPk(postId, {
      include: {
        model: Hashtag,
        through: { attributes: [] },
      },
      transaction,
    });
    const hashtags = postWithHashtag.Hashtags.map((hashtag) => hashtag.title);

    // 추천 정보 가져옴
    const likeCount = await Like.count({
      where: { PostId: postId },
      transaction,
    });
    // 댓글 개수
    const commentCount = await Comment.count({
      where: { PostId: post.id },
      transaction,
    });

    // 해당 게시글의 조회수 +1 처리
    await Post.update(
      {
        view: post.view + 1,
      },
      {
        where: { id: postId },
        transaction,
      },
    );
    // findOne으로 가져왔던 post의 조회수도 +1로 갱신
    // 이 부분 코드위치 조절해서 transaction rollback 발생시 조회수 다시 -1 해줘야함
    post.view += 1;

    const data = {
      post: post.dataValues,
      comments: comments.map((item) => item.dataValues),
      hashtags,
      likeCount,
      commentCount,
    };

    // transaction commit
    await transaction.commit();

    res.json(data);
  } catch (err) {
    // transaction rollback
    await transaction.rollback();

    console.error(err);
    next(err);
  }
};

// create post
exports.createPost = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { boardName } = req.params;
  const { title, filteredContent, tags: hashtags } = req.body;

  try {
    // boardName으로 boardId 찾아서 저장
    const boardId = await Board.findOne({ where: { name: boardName }, transaction });

    // DB posts 테이블에 post 저장
    const post = await Post.create(
      {
        title,
        BoardId: boardId.id,
        UserId: req.user.id,
      },
      { transaction },
    );

    // DB contents 테이블에 filtering된 content 저장
    const contentHTML = await Content.create(
      {
        content: filteredContent,
        PostId: post.id,
      },
      { transaction },
    );

    // hash tag 저장
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.toLowerCase() },
            transaction,
          });
        }),
      );

      await post.addHashtags(
        result.map((r) => r[0]),
        { transaction },
      );
    }

    // post 객체에 boardName과 content 정보를 추가
    post.dataValues.boardName = boardId.dataValues.name;
    post.dataValues.content = contentHTML.dataValues.content;

    // transaction commit
    await transaction.commit();

    return res.status(200).json(post);
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

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

  // 지금은 paranoid: false로 변경해 물리적 삭제로 변경해서 문제를 해결(연관 테이블의 FK는 null로 바뀜)
};

// update post
exports.updatePost = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { boardName, postId } = req.params;
  const { title, filteredContent, tags: newHashtags } = req.body;

  try {
    // old post 저장
    const oldPost = await Post.findByPk(postId, { transaction });

    // boardName으로 boardId 찾아서 저장
    const boardId = await Board.findOne({
      where: { name: boardName },
      transaction,
    });

    // posts 테이블 데이터 update
    await Post.update(
      {
        title: title,
        updatedAt: new Date(),
      },
      {
        where: { id: postId },
        transaction,
      },
    );

    // contents 테이블 데이터 update
    await Content.update(
      {
        content: filteredContent,
        updatedAt: new Date(),
      },
      {
        where: { PostId: postId },
        transaction,
      },
    );

    // hash tag update
    // 넘어온 tags와 db에 저장된 tags를 비교해서 빠지거나 추가된 tags를 업데이트
    const addedHashtags = [];
    const removedHashtags = [];
    const rawHashtags = await oldPost.getHashtags({ transaction });
    const oldHashtags = rawHashtags.map((hashtag) => hashtag.title);

    newHashtags.map((newHashtag) => {
      if (!oldHashtags.includes(newHashtag)) {
        addedHashtags.push(newHashtag);
      }
    });
    oldHashtags.map((oldHashtag) => {
      if (!newHashtags.includes(oldHashtag)) {
        removedHashtags.push(oldHashtag);
      }
    });

    if (addedHashtags && addedHashtags.length > 0) {
      const result = await Promise.all(
        addedHashtags.map((addedHashtag) => {
          return Hashtag.findOrCreate({
            where: { title: addedHashtag.toLowerCase() },
            transaction,
          });
        }),
      );

      await oldPost.addHashtags(
        result.map((r) => r[0]),
        { transaction },
      );
    }
    if (removedHashtags && removedHashtags.length > 0) {
      const result = await Promise.all(
        removedHashtags.map(async (removedHashtag) => {
          return oldPost.removeHashtag(
            rawHashtags.find((hashtag) => hashtag.title === removedHashtag),
            { transaction },
          );
        }),
      );
    }

    // 업데이트 후 리턴해줄 mergedPost(post+body) 작성
    const newPost = await Post.findByPk(postId, { transaction });
    const body = await Content.findOne({
      where: {
        PostId: postId,
      },
      transaction,
    });
    const hashtags = await newPost.getHashtags({ transaction });

    // post 객체에 boardName과 content 정보를 추가
    newPost.dataValues.boardName = boardId.dataValues.name;
    newPost.dataValues.content = body.dataValues.content;
    newPost.dataValues.tags = hashtags.map((hashtag) => hashtag.title);

    console.log(`${boardName}게시판의 ${postId}번 게시글 수정 성공`);

    // transaction commit
    await transaction.commit();

    return res.status(200).json(newPost);
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.log('게시글 수정중 오류 발생');
    console.log(error);
    next(error);
  }
};

// after upload image
exports.afterUploadImage = (req, res) => {
  res.json({ url: `/img/${req.files[0].filename}` });
};
