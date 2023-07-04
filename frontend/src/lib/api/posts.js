import client from './client';

// get posts
export const getPosts = ({ sortType, boardName, limit }) => {
  return client.get(`/board/${boardName}/posts`, {
    params: { sortType, limit },
  });
};
