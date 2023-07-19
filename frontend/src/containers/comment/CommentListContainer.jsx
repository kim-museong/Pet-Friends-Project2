import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../../components/comment/CommentList';
import { deleteComment, getComments } from '../../modules/comment';

const CommentListContainer = () => {
  const postId = useSelector((state) => state.post.post?.post.id);
  const comments = useSelector((state) => state.comment.comments);
  const user = useSelector((state) => state.user.user);

  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const newComment = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) {
      dispatch(getComments({ postId }));
    }
  }, [dispatch, postId]);

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
    <CommentList
      comments={comments}
      loggedInUser={user}
      selectedCommentId={selectedCommentId}
      handleDeleteClick={handleDeleteClick}
      handleReplyClick={handleReplyClick}
      setSelectedCommentId={setSelectedCommentId}
      newComment={newComment}
    ></CommentList>
  );
};

export default CommentListContainer;
