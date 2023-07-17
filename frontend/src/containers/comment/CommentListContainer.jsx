import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../../components/comment/CommentList';
import { deleteComment, getComments } from '../../modules/comment';

const CommentListContainer = () => {
  const comments = useSelector((state) => state.comment?.comments);
  const postId = useSelector((state) => state.post.post?.post.id);

  console.log('comments', comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments({ postId }));
  }, [dispatch, postId]);

  const handleDeleteClick = (commentId) => {
    console.log(`${commentId}의 댓글 삭제 버튼 클릭됨`);
    dispatch(deleteComment({ postId, commentId }));
  };
  const handleReplyClick = (commentId) => {
    console.log(`${commentId}의 대댓글 버튼 클릭됨`);
  };

  return (
    <CommentList
      comments={comments}
      handleDeleteClick={handleDeleteClick}
      handleReplyClick={handleReplyClick}
    ></CommentList>
  );
};

export default CommentListContainer;
