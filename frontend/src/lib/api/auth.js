import client from './client';

export const login = ({ username, password }) => {
  return client.post('/auth/login', {
    username,
    password,
  });
};

export const register = ({ username, password, email, nickname, phone }) => {
  return client.post('/auth/register', {
    username,
    password,
    email,
    nickname,
    phone,
  });
};

export const phone = (phone) => {
  return client.post('/auth/phone', { phone });
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
