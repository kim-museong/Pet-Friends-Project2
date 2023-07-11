import React, { useCallback, useEffect } from 'react';
import Post from '../../components/post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPostAsync } from '../../modules/post';

const PostContainer = ({ postId }) => {
  // 필요 state 값
  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.loading['post/GET_POST']);

  const dispatch = useDispatch();
  const getPost = useCallback((postId) => dispatch(getPostAsync(postId)), [dispatch]);

  // useEffect에 넣어야 하는 값
  useEffect(() => {
    console.log('게시글 정보를 불러옵니다');
    getPost(postId);
  }, [postId, getPost]);

  return <Post post={post} loading={loading}></Post>;
};

export default React.memo(PostContainer);
