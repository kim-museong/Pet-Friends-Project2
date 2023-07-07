import React, { useCallback, useEffect, useRef } from 'react';
import PostList from '../../components/posts/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';

const PostListContainer = () => {
  const posts = useSelector((state) => state.posts.posts);
  const sortType = useSelector((state) => state.sort.sortType);
  const searchCategory = useSelector((state) => state.search.searchCategory);
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
  const loading = useSelector((state) => state.loading['posts/GET_POSTS']);
  const dispatch = useDispatch();
  const getPosts = useCallback(
    ({ sortType, boardName, limit, searchCategory, searchKeyword }) =>
      dispatch(getPostsAsync({ sortType, boardName, limit, searchCategory, searchKeyword })),
    [dispatch],
  );

  // useEffect
  // fetch pictureList on mount
  useEffect(() => {
    console.log(searchCategory, searchKeyword);
    console.log('게시글 리스트 불러옵니다');
    getPosts({ sortType, boardName: 'community', limit: 100, searchCategory, searchKeyword });
  }, [getPosts, sortType]);

  return <PostList posts={posts} loading={loading}></PostList>;
};

export default PostListContainer;