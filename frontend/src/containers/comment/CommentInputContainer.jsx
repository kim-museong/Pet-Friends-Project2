import React, { useEffect, useRef } from 'react';
import CommentInput from '../../components/comment/CommentInput';
import { useDispatch } from 'react-redux';
import { changeCommentInput, createComment, getComments } from '../../modules/comment';
import { useSelector } from 'react-redux';

const CommentInputContainer = () => {
  const user = useSelector((state) => state.user.user);
  const content = useSelector((state) => state.comment.commentInput);
  const postId = useSelector((state) => state.post.post?.post.id);

  const textareaEl = useRef(null);

  const dispatch = useDispatch();

  const handleCommentChange = (event) => {
    dispatch(changeCommentInput(event.target.value));
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(createComment({ content, postId }));
    textareaEl.current.value = '';
  };

  return (
    <CommentInput
      user={user}
      handleCommentChange={handleCommentChange}
      handleClick={handleClick}
      textareaEl={textareaEl}
    ></CommentInput>
  );
};

export default CommentInputContainer;
