import React, { useCallback, useEffect } from 'react';
import Picture from '../../components/post/Picture';
import { useDispatch, useSelector } from 'react-redux';
import { getPostAsync } from '../../modules/post';

const PictureContainer = ({ postId }) => {
  // 작성자, 조회수, imgUrl, 작성일, 댓글수, 추천수

  // 필요 state 값
  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.loading['post/GET_POST']);

  const dispatch = useDispatch();
  const getPost = useCallback((postId) => dispatch(getPostAsync(postId)), [dispatch]);

  // useEffect에 넣어야 하는 값
  useEffect(() => {
    console.log('사진 정보를 불러옵니다');
    getPost(postId);
  }, [postId, getPost]);

  return <Picture post={post} loading={loading}></Picture>;
};

export default React.memo(PictureContainer);
