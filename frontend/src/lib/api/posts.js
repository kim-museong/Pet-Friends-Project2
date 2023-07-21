import client from './client';

// get posts
export const getPosts = ({
  searchCategory = 'titleDetail',
  searchKeyword = '',
  sortType = 'newest',
  currPageNum = '1',
  tag = '',
  boardName,
  limit = 10,
}) => {
  return client.get(`/board/${boardName}/posts`, {
    params: { searchCategory, searchKeyword, sortType, currPageNum, tag, limit },
  });
};

export const getMemo = (id) => {
  return client.post('/user/memo', { id: id });
};
