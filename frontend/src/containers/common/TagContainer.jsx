import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Tag from '../../components/common/Tag';
import { getPostsAsync } from '../../modules/posts';
import { selectPageNumber, selectSortType, selectTag } from '../../modules/searchOption';

const TagContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const boardName = location.pathname.split('/')[1];
  const limit = useRef(10);
  const hashtags = useSelector((state) => state.post.post?.hashtags);

  const dispatch = useDispatch();

  const handleTagClick = (tag) => {
    dispatch(selectSortType('newest'));
    dispatch(selectPageNumber(1));
    dispatch(selectTag(tag));

    dispatch(
      getPostsAsync({
        searchCategory: 'titleDetail',
        searchKeyword: '',
        sortType: 'newest',
        currPageNum: 1,
        tag,
        boardName,
        limit: limit.current,
      }),
    );

    navigate(-1);
  };

  return <Tag hashtags={hashtags} handleTagClick={handleTagClick}></Tag>;
};

export default TagContainer;
