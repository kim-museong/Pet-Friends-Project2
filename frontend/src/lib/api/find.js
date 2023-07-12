import client from './client';

export const checkEmail = ({ email, nickname }) => {
  return client.post('/user/findPwdEmail', { email, nickname });
};
