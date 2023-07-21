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

// memo
export const getMemos = ({ id, search }) => {
  return client.post('/user/memos', { id, search });
};

export const getMemo = ({ id, userId }) => {
  return client.post('/user/memo', { id, userId });
};

export const memoUpdate = () => {
  return client.post('/user/memoUpdate');
};

export const memoDelete = () => {
  return client.post('/user/memoDelete');
};
