import client from './client';

// get post
export const getPost = (postId) => {
  return client.get(`/posts/${postId}`);
};

// post post
export const createPost = ({ boardName, title, content }) => {
  const imgUrl = '';
  return client.post(`/board/${boardName}/posts`, {
    title,
    content,
    imgUrl,
  });
};
