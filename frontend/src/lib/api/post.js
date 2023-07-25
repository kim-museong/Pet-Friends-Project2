import client from './client';

// get post
export const getPost = ({ postId, boardName }) => {
  return client.get(`/posts/${postId}`, {
    params: { boardName },
  });
};

// create post
export const createPost = ({ boardName, title = null, imgUrls = [], content = '', tags = [] }) => {
  return client.post(`/board/${boardName}/posts`, {
    title,
    imgUrls,
    content,
    tags,
  });
};

// delete post
export const deletePost = ({ boardName, postId }) => {
  return client.delete(`/board/${boardName}/posts/${postId}`);
};

// update post
export const updatePost = ({ boardName, postId, title, imgUrls, content, tags }) => {
  console.log(
    `boardName = ${boardName}, postId = ${postId}, title = ${title}, imgUrls = ${imgUrls}, content = ${content}, tags = ${tags}`,
  );
  return client.put(`/board/${boardName}/posts/${postId}`, {
    title,
    imgUrls,
    content,
    tags,
  });
};
