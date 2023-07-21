import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// define action type

const ONCHAMGE_MEMO = 'main/ONCHAMGE_MEMO';
const SHOW_MEMO = 'main/SHOW_MEMO';
const MAIN_INIT = 'main/MAIN_INIT';
const SEARCH_INIT = 'main/SEARCH_INIT';
const MEMO_UPDATE = 'main/MEMO_UPDATE';
const MEMO_DELETE = 'main/MEMO_DELETE';

const [GET_MEMO, GET_MEMO_SUCCESS, GET_MEMO_FAILURE] = createRequestActionTypes('/main/GET_MEMO');
const [GET_MEMOS, GET_MEMOS_SUCCESS, GET_MEMOS_FAILURE] = createRequestActionTypes('/main/GET_MEMOS');

const [GET_POPULARPOST, GET_POPULARPOST_SUCCESS, GET_POPULARPOST_FAILURE] =
  createRequestActionTypes('main/GET_POPULARPOST');

const [GET_MAIN_POSTS, GET_MAIN_POSTS_SUCCESS, GET_MAIN_POSTS_FAILURE] =
  createRequestActionTypes('main/GET_MAIN_POSTS');

const [GET_INFO, GET_INFO_SUCCESS, GET_INFO_FAILURE] = createRequestActionTypes('main/GET_INFO');

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

export const getInfoAsync = createAction(GET_INFO, ({ sortType, boardName, limit }) => ({
  sortType,
  boardName,
  limit,
}));

export const getCardAsync = createAction(GET_CARD_POSTS, ({ sortType, boardName, limit }) => ({
  sortType,
  boardName,
  limit,
}));

export const getMemoAsync = createAction(GET_MEMO, ({ id, userId }) => ({ id, userId }));
export const getMemosAsync = createAction(GET_MEMOS, ({ id, search }) => ({ id, search }));
export const changeMemo = createAction(ONCHAMGE_MEMO, ({ name, value }) => ({ name, value }));
export const showMemo = createAction(SHOW_MEMO);
export const initForm = createAction(MAIN_INIT, (form) => form);
export const searchInit = createAction(SEARCH_INIT);
export const memoUpdate = createAction(MEMO_UPDATE, ({ userId, content }) => ({ userId, content }));
export const memoDelete = createAction(MEMO_DELETE, ({ userId, content }) => ({ userId, content }));

// define saga
const getMainPostsSaga = createRequestSaga(GET_MAIN_POSTS, postsAPI.getPosts);
const getPopularPostsSaga = createRequestSaga(GET_POPULARPOST, postsAPI.getPosts);
const getCardPostsSaga = createRequestSaga(GET_CARD_POSTS, postsAPI.getPosts);
const getInfoSaga = createRequestSaga(GET_INFO, postsAPI.getPosts);
const getMemosSage = createRequestSaga(GET_MEMOS, postsAPI.getMemos);
const getMemoSaga = createRequestSaga(GET_MEMO, postsAPI.getMemo);
const memoUpdateSaga = createRequestSaga(MEMO_UPDATE, postsAPI.memoUpdate);
const memoDeleteSaga = createRequestSaga(MEMO_DELETE, postsAPI.memoDelete);

export function* mainSaga() {
  yield takeLatest(GET_MAIN_POSTS, getMainPostsSaga);
  yield takeLatest(GET_POPULARPOST, getPopularPostsSaga);
  yield takeLatest(GET_CARD_POSTS, getCardPostsSaga);
  yield takeLatest(GET_INFO, getInfoSaga);
  yield takeLatest(GET_MEMOS, getMemosSage);
  yield takeLatest(GET_MEMO, getMemoSaga);
  yield takeLatest(MEMO_UPDATE, memoUpdateSaga);
  yield takeLatest(MEMO_DELETE, memoDeleteSaga);
}

// init
const initialState = {
  popularPost: null,
  info: null,
  posts: null,
  cardPosts: null,
  error: null,
  memo: {
    memo: '',
    memos: '',
    show: false,
    content: '',
    search: '',
  },
};

// reducer
const main = handleActions(
  {
    [ONCHAMGE_MEMO]: (state, { payload: { name, value } }) => ({
      ...state,
      memo: {
        ...state.memo,
        [name]: value,
      },
    }),
    [SHOW_MEMO]: (state) => ({
      ...state,
      memo: {
        ...state.memo,
        show: !state.memo.show,
      },
    }),
    [MAIN_INIT]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [SEARCH_INIT]: (state) => ({
      ...state,
      memo: {
        ...state.memo,
        search: '',
      },
    }),
    [GET_MEMOS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      memo: {
        ...state.memo,
        memos: data,
      },
    }),
    [GET_MEMOS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      memo: {
        ...state.memo,
        memos: null,
      },
    }),
    [GET_MEMO_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      memo: {
        ...state.memo,
        memo: data,
      },
    }),
    [GET_MEMO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      memo: {
        ...state.memo,
        memo: null,
      },
    }),
    [MEMO_UPDATE]: (state) => ({
      ...state,
    }),
    [MEMO_DELETE]: (state) => ({
      ...state,
    }),
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
    [GET_INFO_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      info: data.posts,
    }),
    [GET_INFO_FAILURE]: (state) => ({
      ...state,
      info: null,
    }),
  },
  initialState,
);

export default main;
