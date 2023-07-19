import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TESTCommentInput from '../../components/comment/TESTCommentInput';
import { changeCommentInput, createComment } from '../../modules/TESTcomment';

const TESTCommentInputContainer = ({ commentId = null, isReply = false, setSelectedCommentId = null }) => {
  // (isReply == true) ? (reply) : (comment)
  const user = useSelector((state) => state.user.user);
  const content = useSelector((state) => state.TESTcomment.commentInput);
  const postId = useSelector((state) => state.post.post?.post.id);

  const textareaEl = useRef(null);

  const dispatch = useDispatch();

  const handleCommentChange = (event) => {
    dispatch(changeCommentInput(event.target.value));
  };
  const handleClick = (event) => {
    event.preventDefault();
    if (!isReply) {
      console.log('댓글 등록');
      dispatch(createComment({ content, postId }));
    } else if (isReply) {
      console.log('대댓글 등록');
      dispatch(createComment({ content, commentId, postId }));
    }
    textareaEl.current.value = '';

    if (setSelectedCommentId) {
      setSelectedCommentId('');
    }
  };
  // focus out 되는 순간 state값 초기화 해야함.(댓글-대댓글 입력창 혼선 방지)

  return (
    <TESTCommentInput
      loggedInUser={user}
      handleCommentChange={handleCommentChange}
      handleClick={handleClick}
      textareaEl={textareaEl}
    ></TESTCommentInput>
  );
};

// const TESTCommentInput = ({ handleCommentChange, loggedInUser, textareaEl, handleClick }) => {

export default TESTCommentInputContainer;
