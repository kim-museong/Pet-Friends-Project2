import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../../components/comment/CommentList';
import { getComments } from '../../modules/comment';

const CommentListContainer = () => {
  const comments = useSelector((state) => state.comment?.comments);
  const comment = useSelector((state) => state.comment?.comment);
  const postId = useSelector((state) => state.post.post?.post.id);

  console.log('comments', comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments({ postId }));
  }, []);
  // }, [dispatch, comment, postId]);

  return <CommentList comments={comments}></CommentList>;
};

export default CommentListContainer;
