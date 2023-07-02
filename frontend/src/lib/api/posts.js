import client from './client';

// get posts
// sort type, boardName 등의 정보 포함해서 요청
// 두번째 파라미터로 params에 변수 담아서 요청
export const getPosts = () => {
  return client.get(`/test`);
};
