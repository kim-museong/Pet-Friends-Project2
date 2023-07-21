/////////////
// comment //
/////////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as commentAPI from '../lib/api/comment';
import { takeLatest } from 'redux-saga/effects';

// define action type
const CHANGE_COMMENT_INPUT = 'comment/CHANGE_COMMENT_INPUT';

const GET_COMMENT = 'comment/GET_COMMENT';
const GET_COMMENT_SUCCESS = 'comment/GET_COMMENT_SUCCESS';
const GET_COMMENT_FAILURE = 'comment/GET_COMMENT_FAILURE';

const CREATE_COMMENT = 'comment/CREATE_COMMENT';
const CREATE_COMMENT_SUCCESS = 'comment/CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_FAILURE = 'comment/CREATE_COMMENT_FAILURE';

const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS = 'comment/DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAILURE = 'comment/DELETE_COMMENT_FAILURE';

const UNLOAD_COMMENT = 'comment/UNLOAD_COMMENT';

const ADD_COMMENT_LIKE = 'comment/ADD_COMMENT_LIKE';
const ADD_COMMENT_LIKE_SUCCESS = 'comment/ADD_COMMENT_LIKE_SUCCESS';
const ADD_COMMENT_LIKE_FAILURE = 'comment/ADD_COMMENT_LIKE_FAILURE';

// action creator
export const changeCommentInput = createAction(CHANGE_COMMENT_INPUT, (input) => input);
export const getComments = createAction(GET_COMMENT, (postId) => postId);
export const createComment = createAction(CREATE_COMMENT, ({ content, postId, commentId }) => ({
  content,
  postId,
  commentId,
}));
export const deleteComment = createAction(DELETE_COMMENT, ({ postId, currentId, parentId }) => ({
  postId,
  currentId,
  parentId,
}));
export const unloadComment = createAction(UNLOAD_COMMENT);
export const addCommentLike = createAction(ADD_COMMENT_LIKE);

// define saga
const getCommentsSaga = createRequestSaga(GET_COMMENT, commentAPI.getComments);
const createCommentSaga = createRequestSaga(CREATE_COMMENT, commentAPI.createComment);
const deleteCommentSaga = createRequestSaga(DELETE_COMMENT, commentAPI.deleteComment);
const addCommentLikeSaga = createRequestSaga(ADD_COMMENT_LIKE, commentAPI.addCommentLike);

export function* commentSaga() {
  // get comments 요청
  yield takeLatest(GET_COMMENT, getCommentsSaga);
  // create comment 요청
  yield takeLatest(CREATE_COMMENT, createCommentSaga);
  // delete comment 요청
  yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
  // add comment like 요청
  yield takeLatest(ADD_COMMENT_LIKE, addCommentLikeSaga);
}

// init
const initialState = {
  commentInput: null,
  comments: [],
  commentError: null,
};

// reducer
const comment = handleActions(
  {
    [CHANGE_COMMENT_INPUT]: (state, { payload: commentInput }) => ({
      ...state,
      commentInput,
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
    [CREATE_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
      commentError: null,
    }),
    [CREATE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      comment: null,
      commentError,
    }),
    [DELETE_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
      commentError: null,
    }),
    [DELETE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      comments: null,
      commentError,
    }),
    [UNLOAD_COMMENT]: (state) => initialState,
    // TODO : like modules로 전부 옮길것
    // [ADD_COMMENT_LIKE_SUCCESS]: (state, { payload: comments }) => ({
    //   ...state,
    //   comments,
    //   commentError: null,
    // }),
    // [ADD_COMMENT_LIKE_FAILURE]: (state, { payload: commentError }) => ({
    //   ...state,
    //   comments: null,
    //   commentError,
    // }),
  },
  initialState,
);

export default comment;

// 선택사항. saga에서 추가 요청 or 서버에서 comments까지 응답
// export function* commentSaga() {
//   // create comment 후에 get comments 요청
//   yield takeLatest(CREATE_COMMENT, function* (action) {
//     yield call(createCommentSaga, action);
//     yield call(getCommentsSaga, action);
//   });
//   // get comments 요청
//   yield takeLatest(GET_COMMENT, getCommentsSaga);
//   // delete comments 요청
//   yield takeLatest(DELETE_COMMENT, function* (action) {
//     yield call(deleteCommentSaga, action);
//     yield call(getCommentsSaga, action);
//   });
