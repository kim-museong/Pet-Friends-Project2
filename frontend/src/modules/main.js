import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// define action type

const [GET_POPULARPOST, GET_POPULARPOST_SUCCESS, GET_POPULARPOST_FAILURE] =
  createRequestActionTypes('main/GET_POPULARPOST');

const [GET_MAIN_POSTS, GET_MAIN_POSTS_SUCCESS, GET_MAIN_POSTS_FAILURE] =
  createRequestActionTypes('main/GET_MAIN_POSTS');

const [GET_CARD_POSTS, GET_CARD_POSTS_SUCCESS, GET_CARD_POSTS_FAILURE] =
  createRequestActionTypes('main/GET_CARD_POSTS');

// action creator
export const getMainAsync = createAction(GET_MAIN_POSTS, ({ boardName, limit }) => ({
  boardName,
  limit,
}));
export const getPopularAsync = createAction(GET_POPULARPOST, ({ sortType, boardName, limit }) => ({
  sortType,
  boardName,
  limit,
}));

export const getCardAsync = createAction(GET_CARD_POSTS, ({ sortType, boardName, limit }) => ({
  sortType,
  boardName,
  limit,
}));

// define saga
const getMainPostsSaga = createRequestSaga(GET_MAIN_POSTS, postsAPI.getPosts);
const getPopularPostsSaga = createRequestSaga(GET_POPULARPOST, postsAPI.getPosts);
const getCardPostsSaga = createRequestSaga(GET_CARD_POSTS, postsAPI.getPosts);

export function* mainSaga() {
  yield takeLatest(GET_MAIN_POSTS, getMainPostsSaga);
  yield takeLatest(GET_POPULARPOST, getPopularPostsSaga);
  yield takeLatest(GET_CARD_POSTS, getCardPostsSaga);
}

// init
const initialState = {
  popularPost: null,
  posts: null,
  cardPosts: null,
  error: null,
};

// reducer
const main = handleActions(
  {
    [GET_MAIN_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      posts: data.posts,
      error: null,
    }),
    [GET_MAIN_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: null,
      error: error,
    }),
    [GET_POPULARPOST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      popularPost: data.posts,
      error: null,
    }),
    [GET_POPULARPOST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      popularPost: null,
      error: error,
    }),
    [GET_CARD_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      cardPosts: data.posts,
      error: null,
    }),
    [GET_CARD_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      cardPosts: null,
      error: error,
    }),
  },
  initialState,
);

export default main;
