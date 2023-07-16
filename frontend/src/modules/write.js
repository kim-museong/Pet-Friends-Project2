////////////////
// write post //
////////////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/post';
import { takeLatest } from 'redux-saga/effects';

// define action type
const CHANGE_INPUT = 'write/CHANGE_INPUT';
const INIT_INPUT = 'write/INIT_INPUT';
const STORE_ORIGIN_POST = 'write/STORE_ORIGIN_POST';

const CREATE_POST = 'write/CREATE_POST';
const CREATE_POST_SUCCESS = 'write/CREATE_POST_SUCCESS';
const CREATE_POST_FAILURE = 'write/CREATE_POST_FAILURE';

const UPDATE_POST = 'write/UPDATE_POST';
const UPDATE_POST_SUCCESS = 'write/UPDATE_POST_SUCCESS';
const UPDATE_POST_FAILURE = 'write/UPDATE_POST_FAILURE';

// action creator
export const changeInput = createAction(CHANGE_INPUT, (key, value) => ({ key, value }));
export const initInput = createAction(INIT_INPUT);
export const storeOriginPost = createAction(STORE_ORIGIN_POST, (post) => post);
export const createPost = createAction(CREATE_POST, ({ boardName, title, content, tags }) => ({
  boardName,
  title,
  content,
  tags,
}));
export const updatePost = createAction(UPDATE_POST, ({ boardName, originPostId, title, content, tags }) => ({
  boardName,
  postId: originPostId,
  title,
  content,
  tags,
}));

// define saga
const createPostSaga = createRequestSaga(CREATE_POST, postAPI.createPost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost);
export function* writeSaga() {
  yield takeLatest(CREATE_POST, createPostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

// init
const initialState = {
  title: '',
  content: '',
  tags: [],
  post: null,
  postError: null,
  originPostId: null,
};

// reducer
const write = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    [INIT_INPUT]: () => initialState,
    [STORE_ORIGIN_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.post.CommunityInfo.title,
      content: post.post.Content.content,
      tags: post.hashtags,
      originPostId: post.post.id,
    }),
    [CREATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      postError: null,
    }),
    [CREATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      postError: null,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
  },
  initialState,
);

export default write;
