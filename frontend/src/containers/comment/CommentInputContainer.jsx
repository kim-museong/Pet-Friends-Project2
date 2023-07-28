import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentInput from '../../components/comment/CommentInput';
import { changeCommentInput, createComment } from '../../modules/comment';

const CommentInputContainer = ({ commentId = null, isReply = false, setSelectedCommentId = null }) => {
  // (isReply == true) ? (reply) : (comment)
  const user = useSelector((state) => state.user.user);
  const content = useSelector((state) => state.comment.commentInput);
  const postId = useSelector((state) => state.post.post?.post.id);
  const theme = useSelector((state) => state.theme.theme);
  const textareaEl = useRef(null);
  const dispatch = useDispatch();

  const handleCommentChange = (event) => {
    const { value } = event.target;
    textareaEl.current.style.height = 'auto';
    textareaEl.current.style.height = textareaEl.current.scrollHeight + 'px';
    dispatch(changeCommentInput(value));
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
    <CommentInput
      loggedInUser={user}
      handleCommentChange={handleCommentChange}
      handleClick={handleClick}
      textareaEl={textareaEl}
      theme={theme}
    ></CommentInput>
  );
};

export default CommentInputContainer;
