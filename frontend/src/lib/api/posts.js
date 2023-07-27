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
  console.log(
    `test => searchCategory : ${searchCategory}, searchKeyword : ${searchKeyword}, sortType : ${sortType}, currPageNum : ${currPageNum}, tag : ${tag}, boardName : ${boardName}, limit : ${limit}`,
  );
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

export const memoUpdate = ({ id, content }) => {
  console.log(content);
  return client.post('/user/memoUpdate', { id, content });
};

export const memoDelete = ({ id }) => {
  console.log(id);
  return client.post('/user/memoDelete', { id });
};

export const memoWrite = ({ id, content }) => {
  return client.post('/user/saveMemo', { id, content });
};
