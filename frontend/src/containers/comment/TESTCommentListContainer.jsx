import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TESTCommentList from '../../components/comment/TESTCommentList';
import { deleteComment, getComments } from '../../modules/TESTcomment';

const TESTCommentListContainer = () => {
  const postId = useSelector((state) => state.post.post?.post.id);
  const comments = useSelector((state) => state.TESTcomment.comments);
  const user = useSelector((state) => state.user.user);
  const comment = useSelector((state) => state.TESTcomment.comment);

  const [selectedCommentId, setSelectedCommentId] = useState(null);
  useEffect(() => {
    console.log('selected comment id : ', selectedCommentId);
  }, [selectedCommentId]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) {
      dispatch(getComments({ postId }));
    }
  }, [dispatch, postId, comment]);

  // delete button clicked
  const handleDeleteClick = (isReply, currentId, parentId) => {
    if (!isReply) {
      console.log(`댓글 ${currentId}의 삭제 버튼 클릭됨`);
      console.log('test/comment', postId, currentId, parentId);
      dispatch(deleteComment({ postId, currentId }));
    } else if (isReply) {
      console.log('test/reply', postId, currentId, parentId);
      console.log(`대댓글 ${currentId}의 삭제 버튼 클릭됨`);
      dispatch(deleteComment({ postId, currentId, parentId }));
    }
  };
  // reply button clicked
  const handleReplyClick = (isReply, commentId) => {
    if (!isReply) {
      console.log(`댓글 ${commentId}의 대댓글 버튼 클릭됨`);
    } else if (isReply) {
      console.log(`대댓글 ${commentId}의 대댓글 버튼 클릭됨`);
    }
    setSelectedCommentId((prevCommentId) => (prevCommentId === commentId ? null : commentId));
  };

  return (
    <TESTCommentList
      comments={comments}
      loggedInUser={user}
      selectedCommentId={selectedCommentId}
      handleDeleteClick={handleDeleteClick}
      handleReplyClick={handleReplyClick}
      setSelectedCommentId={setSelectedCommentId}
    ></TESTCommentList>
  );
};

export default TESTCommentListContainer;
