import client from './client';

// create comment
export const createComment = ({ content = '', postId = null }) => {
  return client.post(`/posts/${postId}/comments`, {
    content,
  });
};

// get comments
export const getComments = ({ postId = null }) => {
  return client.get(`/posts/${postId}/comments`);
};

// delete comment
export const deleteComment = ({ postId, commentId }) => {
  return client.delete(`/posts/${postId}/comments/${commentId}`);
};
