import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyList from '../../components/comment/ReplyList';
import { deleteReply, getComments, getReplies } from '../../modules/comment';

const ReplyListContainer = ({ replies, user, postId, parentCommentId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('reply list useEffect post :', postId);
    dispatch(getComments({ postId }));
  }, [dispatch, postId]);

  const handleDeleteClick = (replyId) => {
    console.log(`${replyId}의 대댓글 삭제 버튼 클릭됨`);
    dispatch(deleteReply({ parentCommentId, replyId, postId }));
  };

  return <ReplyList user={user} replies={replies} handleDeleteClick={handleDeleteClick}></ReplyList>;
};

export default ReplyListContainer;
