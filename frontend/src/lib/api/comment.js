import client from './client';

// create comment
export const createComment = ({ content = '', postId = null }) => {
  console.log(`content: ${content}, postId: ${postId}`);
  return client.post(`/posts/${postId}/comments`, {
    content,
  });
};
