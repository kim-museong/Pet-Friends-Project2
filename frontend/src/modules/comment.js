/////////////
// comment //
/////////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/comment';
import { takeLatest } from 'redux-saga/effects';

// define action type
const CHANGE_COMMENT_INPUT = 'comment/CHANGE_COMMENT_INPUT';

const CREATE_COMMENT = 'comment/CREATE_COMMENT';
const CREATE_COMMENT_SUCCESS = 'comment/CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_FAILURE = 'comment/CREATE_COMMENT_FAILURE';

const GET_COMMETNS = 'comment/GET_COMMETNS';
const GET_COMMETNS_SUCCESS = 'comment/GET_COMMETNS_SUCCESS';
const GET_COMMETNS_FAILURE = 'comment/GET_COMMETNS_FAILURE';

// action creator
export const changeCommentInput = createAction(CHANGE_COMMENT_INPUT, (input) => input);

export const createComment = createAction(CREATE_COMMENT, ({ content, postId }) => ({ content, postId }));

export const getComments = createAction(GET_COMMETNS, (postId) => postId);

// define saga
const createCommentSaga = createRequestSaga(CREATE_COMMENT, postAPI.createComment);
const getCommentsSaga = createRequestSaga(GET_COMMETNS, postAPI.getComments);
export function* commentSaga() {
  yield takeLatest(CREATE_COMMENT, createCommentSaga);
  yield takeLatest(GET_COMMETNS, getCommentsSaga);
}

// init
const initialState = {
  commentInput: null,
  comment: null,
  comments: null,
  commentError: null,
};

// reducer
const comment = handleActions(
  {
    [CHANGE_COMMENT_INPUT]: (state, { payload: commentInput }) => ({
      ...state,
      commentInput,
    }),
    [CREATE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
      commentError: null,
    }),
    [CREATE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      comment: null,
      commentError,
    }),
    [GET_COMMETNS_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
      commentError: null,
    }),
    [GET_COMMETNS_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      comments: null,
      commentError,
    }),
  },
  initialState,
);

export default comment;
