import client from './client';

export const login = ({ username, password }) => {
  return client.post('/auth/login', {
    username,
    password,
  });
  //중괄호 생략시 return 삭제
};

export const register = ({ username, password, email, nickname }) => {
  return client.post('/auth/register', {
    username,
    password,
    email,
    nickname,
  });
};

export const check = () => {
  return client.get('/auth/check');
};

export const logout = () => {
  return client.post('/auth/logout');
};

export const kakao = () => {
  return client.get('/auth/kakao');
};
