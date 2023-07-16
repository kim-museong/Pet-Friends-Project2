import React from 'react';
import CommentInput from '../../components/comment/CommentInput';
import { useDispatch } from 'react-redux';
import { changeCommentInput, createComment } from '../../modules/comment';
import { useSelector } from 'react-redux';

const CommentInputContainer = () => {
  const user = useSelector((state) => state.user.user);
  const content = useSelector((state) => state.comment.commentInput);
  const postId = useSelector((state) => state.post.post.post.id);

  const dispatch = useDispatch();

  const handleCommentChange = (event) => {
    dispatch(changeCommentInput(event.target.value));
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log('댓글쓰기 누름');
    dispatch(createComment({ content, postId }));
  };

  return <CommentInput user={user} handleCommentChange={handleCommentChange} handleClick={handleClick}></CommentInput>;
};

export default CommentInputContainer;
