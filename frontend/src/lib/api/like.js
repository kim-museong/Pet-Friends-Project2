import client from './client';

// get likes
export const getLikes = ({ userId, postId }) => {
  console.log('getLikes 요청', userId, postId);
  return client.get(`/users/${userId}/likes`, {
    params: {
      postId,
    },
  });
};

// add like
export const addLike = ({ userId, postId, targetType, targetId }) => {
  console.log('addLike 요청', userId, postId, targetType, targetId);
  return client.post(`/users/${userId}/likesTEST`, {
    postId,
    targetType,
    targetId,
  });
};

// delete like
export const deleteLike = ({ userId, targetType, targetId, postId }) => {
  console.log('deleteLike 요청', userId, targetType, targetId, postId);
  return client.delete(`/users/${userId}/likesTEST/`, {
    params: {
      userId,
      targetType,
      targetId,
      postId,
    },
  });
};

// delete like
// export const deleteLike = ({ userId, likableType, likableId, postId }) => {
//   console.log('deleteLike 요청', userId, likableType, likableId, postId);
//   return client.delete(`/users/${userId}/likes`, {
//     params: {
//       likableType,
//       likableId,
//       postId,
//     },
//   });
// };
