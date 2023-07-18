import client from './client';

// create comment
export const createComment = ({ content = '', postId = null }) => {
  return client.post(`/posts/${postId}/comments`, {
    content,
  });
};

// get comments
export const getComments = ({ postId = null }) => {
  console.log('getComments 요청', postId);
  return client.get(`/posts/${postId}/comments`);
};

// delete comment
export const deleteComment = ({ postId, commentId }) => {
  return client.delete(`/posts/${postId}/comments/${commentId}`);
};

// create reply
export const createReply = ({ content = '', parentCommentId = null }) => {
  console.log('createReply 요청', content, parentCommentId);
  return client.post(`/comments/${parentCommentId}/replies`, {
    content,
  });
};

// get replies
export const getReplies = ({ parentCommentId = null }) => {
  console.log('getReplies 요청', parentCommentId);
  return client.get(`/comments/${parentCommentId}/replies`);
};

// delete reply
export const deleteReply = ({ parentCommentId = null, replyId = null }) => {
  console.log('deleteReply 요청', parentCommentId, replyId);
  return client.delete(`/comments/${parentCommentId}/replies/${replyId}`);
};
