// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import CommentList from '../../components/comment/CommentList';
// import { deleteComment, getComments } from '../../modules/comment';
// import { useState } from 'react';

// const CommentListContainer = () => {
//   console.log('CommentListContainer render(rerender)');
//   const user = useSelector((state) => state.user.user);
//   const comments = useSelector((state) => state.comment?.comments);
//   const postId = useSelector((state) => state.post.post?.post.id);
//   const [selectedCommentId, setSelectedCommentId] = useState(null);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log('CommentListContainer mounted');
//     dispatch(getComments({ postId }));
//   }, [dispatch, postId]);

//   const handleDeleteClick = (commentId) => {
//     console.log(`${commentId}의 댓글 삭제 버튼 클릭됨`);
//     dispatch(deleteComment({ postId, commentId }));
//   };
//   const handleReplyClick = (commentId) => {
//     console.log(`${commentId}의 대댓글 버튼 클릭됨`);
//     setSelectedCommentId((prevCommentId) => (prevCommentId === commentId ? null : commentId));
//   };

//   return (
//     <CommentList
//       user={user}
//       comments={comments}
//       postId={postId}
//       handleDeleteClick={handleDeleteClick}
//       handleReplyClick={handleReplyClick}
//       selectedCommentId={selectedCommentId}
//     ></CommentList>
//   );
// };

// export default CommentListContainer;
