import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyList from '../../components/comment/ReplyList';
import { deleteReply, getComments, getReplies } from '../../modules/comment';

const ReplyListContainer = ({ replies, user, postId, parentCommentId }) => {
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('ReplyListContainer mounted');
    dispatch(getComments({ postId }));
  }, [dispatch, postId]);

  const handleDeleteClick = (replyId) => {
    console.log(`${replyId}의 대댓글 삭제 버튼 클릭됨`);
    dispatch(deleteReply({ parentCommentId, replyId, postId }));
  };

  const handleReplyClick = (commentId) => {
    console.log(`${commentId}의 대댓글 버튼 클릭됨`);
    setSelectedCommentId((prevCommentId) => (prevCommentId === commentId ? null : commentId));
  };

  return (
    <ReplyList
      user={user}
      replies={replies}
      handleDeleteClick={handleDeleteClick}
      handleReplyClick={handleReplyClick}
      selectedCommentId={selectedCommentId}
      parentCommentId={parentCommentId}
    ></ReplyList>
  );
};

export default ReplyListContainer;
