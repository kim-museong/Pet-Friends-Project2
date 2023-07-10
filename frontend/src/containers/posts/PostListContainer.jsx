import React, { useCallback, useEffect, useRef } from 'react';
import PostList from '../../components/posts/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';

const PostListContainer = () => {
  const posts = useSelector((state) => state.posts.posts);
  const sortType = useSelector((state) => state.sort.sortType);
  const searchCategory = useSelector((state) => state.search.searchCategory);
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
  const currPageNum = useSelector((state) => state.pagination.pageNumber);
  const loading = useSelector((state) => state.loading['posts/GET_POSTS']);
  const dispatch = useDispatch();
  const getPosts = useCallback(
    ({ searchCategory, searchKeyword, sortType, currPageNum, boardName, limit }) =>
      dispatch(getPostsAsync({ searchCategory, searchKeyword, sortType, currPageNum, boardName, limit })),
    [dispatch],
  );

  // useEffect
  // fetch pictureList on mount
  useEffect(() => {
    console.log(searchCategory, searchKeyword);
    console.log('게시글 리스트 불러옵니다');
    getPosts({ searchCategory, searchKeyword, sortType, currPageNum, boardName: 'community', limit: 10 }); // limit에 '한 페이지 보여줄 게시글' 변수 할당
  }, [getPosts, searchCategory, searchKeyword, sortType, currPageNum]);

  return <PostList posts={posts} loading={loading}></PostList>;
};

export default PostListContainer;
