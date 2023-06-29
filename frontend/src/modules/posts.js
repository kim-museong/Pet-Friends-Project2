// get post list(boardId)

import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';

// define action type
const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_POSTS_FAILURE = 'posts/GET_POSTS_FAILURE';

// action creator
export const getPosts = createAction(GET_POSTS, (boardId) => boardId);

// define saga
const getPostsSaga = createRequestSaga(GET_POSTS /* api 요청 주소 */);

// init
const initialState = {
  posts: null,
};

// reducer
const posts = handleActions(
  {
    [GET_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      posts: data,
    }),
    [GET_POSTS_FAILURE]: (state, { payload: data }) => ({
      ...state,
    }),
  },
  initialState,
);

export default posts;
