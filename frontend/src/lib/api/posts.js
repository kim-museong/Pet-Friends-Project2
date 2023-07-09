import client from './client';

// get posts
export const getPosts = ({ searchCategory = '', searchKeyword = '', sortType, currPageNum, boardName, limit }) => {
  return client.get(`/board/${boardName}/posts`, {
    params: { searchCategory, searchKeyword, sortType, currPageNum, limit },
  });
};
