import client from './client';

// get post
export const getPost = (postId) => {
  return client.get(`/posts/${postId}`);
};
