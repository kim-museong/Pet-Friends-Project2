////////////////////////////
// get post list(boardId) //
////////////////////////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// define action type
const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_POSTS_FAILURE = 'posts/GET_POSTS_FAILURE';

// action creator
export const getPostsAsync = createAction(GET_POSTS);

// define saga
const getPostsSaga = createRequestSaga(GET_POSTS, postsAPI.getPosts);
export function* postsSaga() {
  yield takeLatest(GET_POSTS, getPostsSaga);
}

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
    [GET_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
    }),
  },
  initialState,
);

export default posts;
