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
// const CommunityDetail = require('../models/CommunityDetail');
// const PictureDetail = require('../models/PictureDetail');

////////////////////////////////////////////////////////////
///////////////////// read post list ///////////////////////
////////////////////////////////////////////////////////////
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

  // console.log('------------------------------------------------------');
  // console.log(
  //   `searchCategory : ${searchCategory}, searchKeyword : ${searchKeyword}, sortType : ${sortType}, currPageNum : ${currPageNum}, tag : ${tag}, limit : ${limit}`,
  // );
  // console.log('------------------------------------------------------');

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
      // {
      //   model: Like,
      //   attributes: ['UserId', 'PostId'],
      // },
      {
        model: Hashtag,
      },
    ],
    offset: offset,
    order: [[column, order]],
    limit: parseInt(limit),
  };

  // 게시판 종류에 따라 querySQL 추가
  if (boardName === 'community' || boardName === 'info' || boardName === 'notice') {
    querySQL.include.push({
      model: CommunityDetail,
      attributes: ['title'],
    });
  } else if (boardName === 'picture') {
    querySQL.include.push({
      model: PictureDetail,
      attributes: ['imgUrl'],
    });
  }

  // 조건에 따라 querySQL 추가 옵션 지정
  // 태그가 존재
  if (tag) {
    querySQL.include.find((include) => include.model === Hashtag).where = {
      title: tag,
    };
  }
  // TODO : html 태그가 같이 검색되는 문제. mysql로 쿼리문을 통채로 보내서 해결하던가 검색용 db 따로 만들어야함
  // 검색 Keyword가 존재

  // category : 제목+내용
  if (searchCategory === 'titleDetail' && searchKeyword !== '') {
    querySQL.where = {
      [Op.or]: [
        { '$CommunityDetail.title$': { [Op.like]: `%${title}%` } },
        { '$Content.content$': { [Op.like]: `%${content}%` } },
      ],
    };
    querySQL.subQuery = false;

    // category : 제목
  } else if (searchCategory === 'title' && searchKeyword !== '') {
    // querySQL.where = { title: { [Op.like]: `%${title}%` } };
    querySQL.where = { '$CommunityDetail.title$': { [Op.like]: `%${title}%` } };
    querySQL.subQuery = false;

    // category : 닉네임
  } else if (searchCategory === 'nickname' && searchKeyword !== '') {
    querySQL.include.find((include) => include.model === User).where = {
      nickname: nickname,
    };
  }

  const formattedData = {
    postCount: 0,
    posts: null,
  };
  const countQuerySQL = { ...querySQL };
  delete countQuerySQL.limit;

  Promise.all([Post.findAll(querySQL), Post.count(countQuerySQL)])
    .then(([data, postCount]) => {
      formattedData.posts = data.map((post) => post.dataValues);
      formattedData.postCount = postCount;
      res.json(formattedData);
    })
    .catch((error) => {
      console.error(error);
    });

  // Post.findAll(querySQL)
  //   .then((data) => {
  //     formattedData = {
  //       // postCount: data.length,
  //       posts: data.map((post) => post.dataValues),
  //     };
  //     // 필요한 정보만 가공해서 주도록 수정
  //     // 쿼리문에서 attributes 변경으로 해결
  //     // res.json(formattedData);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  // Post.count(countQuerySQL).then((postCount) => {
  //   formattedData = {
  //     ...formattedData,
  //     postCount: postCount,
  //   };
  // });
};

////////////////////////////////////////////////////////////
/////////////////////// read post //////////////////////////
////////////////////////////////////////////////////////////
exports.readPost = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  const { postId } = req.params;
  const { boardName } = req.query;

  try {
    // 게시판에 따라 다른 쿼리문
    const querySQL = {
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
        {
          model: Comment,
          attributes: ['id', 'userId'],
        },
        // {
        //   model: Hashtag,
        //   attributes: ['title'],
        // },
      ],
      where: { id: postId },
      transaction,
    };
    if (boardName === 'community') {
      querySQL.include.push({
        model: CommunityDetail,
        attributes: ['title'],
      });
    } else if (boardName === 'picture') {
      querySQL.include.push({
        model: PictureDetail,
        attributes: ['imgUrl'],
      });
    }
    // 해시태그 정보 가져옴
    const postWithHashtag = await Post.findByPk(postId, {
      include: {
        model: Hashtag,
      },
      transaction,
    });
    const hashtags = postWithHashtag.Hashtags.map((hashtag) => hashtag.title);

    const post = await Post.findOne(querySQL);
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
      // comments: comments.map((item) => item.dataValues),
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

////////////////////////////////////////////////////////////
/////////////////////// create post ////////////////////////
////////////////////////////////////////////////////////////
exports.createPost = async (req, res, next) => {
  const { boardName } = req.params;
  const { title = null, imgUrl = null, filteredContent, tags: hashtags = [] } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // 1. get board by boardName
    const board = await Board.findOne({
      where: { name: boardName },
      transaction,
    });
    if (board) {
      // 2. create post
      const newPost = await Post.create(
        {
          BoardId: board.id,
          UserId: req.user.id,
          likeCount: 0,
        },
        { transaction },
      );
      // 3. create post information
      if (newPost && boardName == 'community') {
        await CommunityDetail.create(
          {
            title,
            PostId: newPost.id,
          },
          { transaction },
        );
      } else if (new Post() && boardName == 'picture') {
        await PictureDetail.create(
          {
            imgUrl,
            PostId: newPost.id,
          },
          { transaction },
        );
      }
      // 4. create post content
      const contentHTML = await Content.create(
        {
          content: filteredContent,
          PostId: newPost.id,
        },
        { transaction },
      );
      // 5. create or find hashtag
      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) => {
            return Hashtag.findOrCreate({
              where: { title: tag.toLowerCase() },
              transaction,
            });
          }),
        );
        // 6. connect posts - hashtags table
        const postHashtags = result.map((r) => ({
          PostId: newPost.id,
          HashtagId: r[0].id,
        }));
        await PostHashtag.bulkCreate(postHashtags, { transaction });
      }
      // post 객체에 boardName과 content 정보를 추가
      newPost.dataValues.boardName = board.dataValues.name;
      newPost.dataValues.content = contentHTML.dataValues.content;

      // transaction commit
      await transaction.commit();

      return res.status(200).json(newPost);
    } else {
      return res.status(404).json({ error: 'board not found' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};

////////////////////////////////////////////////////////////
////////////////////// delete post /////////////////////////
////////////////////////////////////////////////////////////
exports.deletePost = async (req, res, next) => {
  const { boardName, postId } = req.params;

  const transaction = await sequelize.transaction();

  try {
    // 1. delete post
    if (postId) {
      await Post.destroy({
        where: { id: postId },
        transaction,
      });
      // 2. delete post info
      if (boardName === 'community') {
        await CommunityDetail.destroy({
          where: { PostId: postId },
          transaction,
        });
      } else if (boardName === 'picture') {
        await PictureDetail.destroy({
          where: { PostId: postId },
          transaction,
        });
      }
      // 3. delete post content
      await Content.destroy({
        where: { PostId: postId },
        transaction,
      });
      // 4. delete post hashtag
      await PostHashtag.destroy({
        where: { PostId: postId },
        transaction,
      });
      // store deleted comments id
      const comments = await Comment.findAll({
        where: { PostId: postId },
        attributes: ['id'],
        transaction,
      });
      if (comments) {
        // 5-1. delete post comment
        await Comment.destroy({
          where: { PostId: postId },
          transaction,
        });
        const commentIds = comments.map((comment) => comment.id);
        // 5-2. delete comment reply
        await Reply.destroy({
          where: { CommentId: commentIds },
          transaction,
        });
      }
      // 6. delete post like
      await Like.destroy({
        where: { PostId: postId },
        transaction,
      });

      // transaction commit
      await transaction.commit();

      console.log(`${boardName} 게시판의 ${postId}번 게시글 삭제 성공`);
      res.status(200).end();
    } else {
      return res.status(404).json({ error: 'the postId is incorrect' });
    }
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};

////////////////////////////////////////////////////////////
////////////////////// update post /////////////////////////
////////////////////////////////////////////////////////////
exports.updatePost = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  const { boardName, postId } = req.params;
  const { title = null, imgUrl = null, filteredContent, tags: newHashtags = [] } = req.body;

  try {
    // old post 저장
    const oldPost = await Post.findByPk(postId, { transaction });

    // boardName으로 boardId 찾아서 저장
    const board = await Board.findOne({
      where: { name: boardName },
      transaction,
    });

    // 1. post update
    await Post.update(
      {},
      {
        where: { id: postId },
        transaction,
      },
    );

    // 2. content update
    await Content.update(
      {
        content: filteredContent,
      },
      {
        where: { PostId: postId },
        transaction,
      },
    );

    // 3. postinfo update
    if (boardName === 'community') {
      await CommunityDetail.update(
        {
          title,
        },
        {
          where: { PostId: postId },
          transaction,
        },
      );
    } else if (boardName === 'picture') {
      await PictureDetail.update(
        {
          imgUrl,
        },
        {
          where: { PostId: postId },
          transaction,
        },
      );
    }

    // 4. hash tag update
    // 넘어온 tags와 db에 저장된 tags를 비교해서 빠지거나 추가된 tags를 업데이트
    const addedHashtags = [];
    const removedHashtags = [];
    const rawHashtags = await oldPost.getHashtags({ transaction });
    const oldHashtags = rawHashtags.map((hashtag) => hashtag.title);

    // 추가된 hashtag
    newHashtags.map((newHashtag) => {
      if (!oldHashtags.includes(newHashtag)) {
        addedHashtags.push(newHashtag);
      }
    });
    // 제거된 hashtag
    oldHashtags.map((oldHashtag) => {
      if (!newHashtags.includes(oldHashtag)) {
        removedHashtags.push(oldHashtag);
      }
    });

    // hashtag 추가
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
    // hashtag 제거
    if (removedHashtags && removedHashtags.length > 0) {
      await Promise.all(
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
    // const body = await Content.findOne({
    //   where: {
    //     PostId: postId,
    //   },
    //   transaction,
    // });
    // const hashtags = await newPost.getHashtags({ transaction });

    // post 객체에 boardName과 content 정보를 추가
    newPost.dataValues.boardName = board.dataValues.name;
    // newPost.dataValues.content = body.dataValues.content;
    // newPost.dataValues.tags = hashtags.map((hashtag) => hashtag.title);

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

////////////////////////////////////////////////////////////
////////////////// after upload image //////////////////////
////////////////////////////////////////////////////////////
exports.afterUploadImage = (req, res) => {
  res.json({ url: `/img/${req.files[0].filename}` });
};
