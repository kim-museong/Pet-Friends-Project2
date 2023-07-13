import client from './client';

// get post
export const getPost = (postId) => {
  return client.get(`/posts/${postId}`);
};

// create post
export const createPost = ({ boardName, title, content, tags }) => {
  const imgUrl = '';
  return client.post(`/board/${boardName}/posts`, {
    title,
    content,
    imgUrl,
    tags,
  });
};

// delete post
export const deletePost = ({ boardName, postId }) => {
  return client.delete(`/board/${boardName}/posts/${postId}`);
};

// update post
export const updatePost = ({ boardName, postId, title, content, tags }) => {
  return client.put(`/board/${boardName}/posts/${postId}`, {
    title,
    content,
    tags,
  });
};
