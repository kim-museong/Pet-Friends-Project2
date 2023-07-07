import client from './client';

// get posts
export const getPosts = ({ sortType, boardName, limit, searchCategory = '', searchKeyword = '' }) => {
  return client.get(`/board/${boardName}/posts?searchCategory=${searchCategory}&searchKeyword=${searchKeyword}`, {
    params: { sortType, limit },
  });
};
