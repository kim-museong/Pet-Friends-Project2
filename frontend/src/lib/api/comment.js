import client from './client';

// create comment
export const createComment = ({ content = '', postId = null, commentId = null }) => {
  if (postId !== null && commentId === null) {
    // create comment
    console.log(`댓글 쓰기 요청 content = ${content}, postId = ${postId}, commentId = ${commentId}`);
    return client.post(`/posts/${postId}/comments`, {
      content,
    });
  } else if (commentId !== null) {
    // create reply
    console.log(`대댓글 쓰기 요청 content = ${content}, postId = ${postId}, commentId = ${commentId}`);
    return client.post(`/comments/${commentId}/replies`, {
      content,
      postId,
    });
  }
};

// get comments
export const getComments = ({ postId = null }) => {
  console.log('getComments 요청', postId);
  return client.get(`/posts/${postId}/comments`);
};

// delete comment
export const deleteComment = ({ postId = null, currentId = null, parentId = null }) => {
  console.log(`deleteComment 진입 postId:${postId}, currentId:${currentId} parentId:${parentId}`);

  if (!parentId) {
    // delete comment
    console.log(`<deleteComment> postId:${postId}, currentId:${currentId} parentId:${parentId}`);
    return client.delete(`/posts/${postId}/comments/${currentId}`);
  } else if (parentId) {
    // delete reply
    console.log(`<deleteReply> postId:${postId}, currentId:${currentId} parentId:${parentId}`);
    return client.delete(`/comments/${parentId}/replies/${currentId}`, {
      params: { postId },
    });
  }
};

// // delete comment
// export const deleteComment = ({ postId, commentId }) => {
//   return client.delete(`/posts/${postId}/comments/${commentId}`);
// };

// create reply
// export const createReply = ({ content = '', parentCommentId = null }) => {
//   console.log('createReply 요청', content, parentCommentId);
//   return client.post(`/comments/${parentCommentId}/replies`, {
//     content,
//   });
// };

// // get replies
// export const getReplies = ({ parentCommentId = null }) => {
//   console.log('getReplies 요청', parentCommentId);
//   return client.get(`/comments/${parentCommentId}/replies`);
// };

// // delete reply
// export const deleteReply = ({ parentCommentId = null, replyId = null }) => {
//   console.log('deleteReply 요청', parentCommentId, replyId);
//   return client.delete(`/comments/${parentCommentId}/replies/${replyId}`);
// };
