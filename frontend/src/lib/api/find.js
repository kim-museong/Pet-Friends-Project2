import client from './client';

export const checkEmail = ({ email, userId }) => {
  return client.post('/users/findPwdEmail', { email, userId });
};
