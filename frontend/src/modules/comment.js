/////////////
// comment //
/////////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/comment';
import { takeLatest, call } from 'redux-saga/effects';

// define action type
const CHANGE_COMMENT_INPUT = 'comment/CHANGE_COMMENT_INPUT';

const CREATE_COMMENT = 'comment/CREATE_COMMENT';
const CREATE_COMMENT_SUCCESS = 'comment/CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_FAILURE = 'comment/CREATE_COMMENT_FAILURE';

const GET_COMMENT = 'comment/GET_COMMENT';
const GET_COMMENT_SUCCESS = 'comment/GET_COMMENT_SUCCESS';
const GET_COMMENT_FAILURE = 'comment/GET_COMMENT_FAILURE';

const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS = 'comment/DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAILURE = 'comment/DELETE_COMMENT_FAILURE';

// action creator
export const changeCommentInput = createAction(CHANGE_COMMENT_INPUT, (input) => input);
export const createComment = createAction(CREATE_COMMENT, ({ content, postId }) => ({ content, postId }));
export const getComments = createAction(GET_COMMENT, (postId) => postId);
export const deleteComment = createAction(DELETE_COMMENT, ({ postId, commentId }) => ({ postId, commentId }));

// define saga
const createCommentSaga = createRequestSaga(CREATE_COMMENT, postAPI.createComment);
const getCommentsSaga = createRequestSaga(GET_COMMENT, postAPI.getComments);
const deleteCommentSaga = createRequestSaga(DELETE_COMMENT, postAPI.deleteComment);
export function* commentSaga() {
  // create comment 후에 get comments 요청
  yield takeLatest(CREATE_COMMENT, function* (action) {
    yield call(createCommentSaga, action);
    yield call(getCommentsSaga, action);
  });
  // get comments 요청
  yield takeLatest(GET_COMMENT, getCommentsSaga);
  // delete comments 요청
  yield takeLatest(DELETE_COMMENT, function* (action) {
    yield call(deleteCommentSaga, action);
    yield call(getCommentsSaga, action);
  });
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
    [GET_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
      commentError: null,
    }),
    [GET_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      comments: null,
      commentError,
    }),
    [DELETE_COMMENT_SUCCESS]: (state) => ({
      ...state,
    }),
    [DELETE_COMMENT_FAILURE]: (state) => ({
      ...state,
    }),
  },
  initialState,
);

export default comment;
