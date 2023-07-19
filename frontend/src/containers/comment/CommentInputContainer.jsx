// import React, { useEffect, useRef } from 'react';
// import CommentInput from '../../components/comment/CommentInput';
// import { useDispatch } from 'react-redux';
// import { changeCommentInput, createComment, getComments } from '../../modules/comment';
// import { useSelector } from 'react-redux';
// import { createReply } from '../../modules/comment';

// const CommentInputContainer = ({ parentCommentId = null }) => {
//   const user = useSelector((state) => state.user.user);
//   const content = useSelector((state) => state.comment.commentInput);
//   const postId = useSelector((state) => state.post.post?.post.id);

//   const textareaEl = useRef(null);

//   const dispatch = useDispatch();

//   const handleCommentChange = (event) => {
//     dispatch(changeCommentInput(event.target.value));
//   };

//   const handleClick = (event) => {
//     event.preventDefault();
//     if (!parentCommentId) {
//       console.log('댓글 등록');
//       dispatch(createComment({ content, postId }));
//     } else {
//       console.log('대댓글 등록');
//       dispatch(createReply({ content, parentCommentId, postId }));
//     }
//     textareaEl.current.value = '';
//   };

//   return (
//     <CommentInput
//       user={user}
//       handleCommentChange={handleCommentChange}
//       handleClick={handleClick}
//       textareaEl={textareaEl}
//     ></CommentInput>
//   );
// };

// export default CommentInputContainer;
