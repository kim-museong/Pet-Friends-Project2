import client from './client';

// get post
export const getPost = ({ postId, boardName }) => {
  return client.get(`/posts/${postId}`, {
    params: { boardName },
  });
};

// create post
export const createPost = ({ boardName, title = null, imgUrl = null, content = null, tags = [] }) => {
  return client.post(`/board/${boardName}/posts`, {
    title,
    imgUrl,
    content,
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
