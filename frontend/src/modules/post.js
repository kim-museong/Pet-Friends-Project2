//////////////////////
// get post(postId) //
//////////////////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/post';
import { takeLatest } from 'redux-saga/effects';

// define action type
const GET_POST = 'post/GET_POST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';
const INIT_POST = 'post/INIT_POST';

// action creator
export const getPostAsync = createAction(GET_POST, (postId) => postId);
export const initPost = createAction(INIT_POST);

// define saga
const getPostSaga = createRequestSaga(GET_POST, postAPI.getPost);
export function* postSaga() {
  yield takeLatest(GET_POST, getPostSaga);
}

// init
const initialState = {
  post: null,
};

// reducer
const post = handleActions(
  {
    [GET_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      post: data,
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      // error handle 필요함
    }),
    [INIT_POST]: () => initialState,
  },
  initialState,
);

export default post;
