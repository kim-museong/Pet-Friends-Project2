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
export const getPostsAsync = createAction(
  GET_POSTS,
  ({ searchCategory, searchKeyword, sortType, currPageNum, boardName, limit }) => ({
    searchCategory,
    searchKeyword,
    sortType,
    currPageNum,
    boardName,
    limit,
  }),
);

// define saga
const getPostsSaga = createRequestSaga(GET_POSTS, postsAPI.getPosts);
export function* postsSaga() {
  yield takeLatest(GET_POSTS, getPostsSaga);
}

// init
const initialState = {
  postCount: 0,
  posts: null,
};

// reducer
const posts = handleActions(
  {
    [GET_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      postCount: data.postCount,
      posts: data.posts,
    }),
    [GET_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      // error handle 필요함
    }),
  },
  initialState,
);

export default posts;
