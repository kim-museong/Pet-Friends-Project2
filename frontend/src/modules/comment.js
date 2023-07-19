// /////////////
// // comment //
// /////////////
// import { createAction, handleActions } from 'redux-actions';
// import createRequestSaga from '../lib/createRequestSaga';
// import * as commentAPI from '../lib/api/comment';
// import { takeLatest, call } from 'redux-saga/effects';

// // define action type
// const CHANGE_COMMENT_INPUT = 'comment/CHANGE_COMMENT_INPUT';

// const CREATE_COMMENT = 'comment/CREATE_COMMENT';
// const CREATE_COMMENT_SUCCESS = 'comment/CREATE_COMMENT_SUCCESS';
// const CREATE_COMMENT_FAILURE = 'comment/CREATE_COMMENT_FAILURE';

// const GET_COMMENT = 'comment/GET_COMMENT';
// const GET_COMMENT_SUCCESS = 'comment/GET_COMMENT_SUCCESS';
// const GET_COMMENT_FAILURE = 'comment/GET_COMMENT_FAILURE';

// const DELETE_COMMENT = 'comment/DELETE_COMMENT';
// const DELETE_COMMENT_SUCCESS = 'comment/DELETE_COMMENT_SUCCESS';
// const DELETE_COMMENT_FAILURE = 'comment/DELETE_COMMENT_FAILURE';

// const CHANGE_REPLY_INPUT = 'reply/CHANGE_REPLY_INPUT';

// const CREATE_REPLY = 'comment/CREATE_REPLY';
// const CREATE_REPLY_SUCCESS = 'comment/CREATE_REPLY_SUCCESS';
// const CREATE_REPLY_FAILURE = 'comment/CREATE_REPLY_FAILURE';

// const DELETE_REPLY = 'comment/DELETE_REPLY';
// const DELETE_REPLY_SUCCESS = 'comment/DELETE_REPLY_SUCCESS';
// const DELETE_REPLY_FAILURE = 'comment/DELETE_REPLY_FAILURE';

// // action creator
// export const changeCommentInput = createAction(CHANGE_COMMENT_INPUT, (input) => input);
// export const createComment = createAction(CREATE_COMMENT, ({ content, postId }) => ({ content, postId }));
// export const getComments = createAction(GET_COMMENT, (postId) => postId);
// export const deleteComment = createAction(DELETE_COMMENT, ({ postId, commentId }) => ({ postId, commentId }));

// export const changeReplyInput = createAction(CHANGE_REPLY_INPUT, (input) => input);
// export const createReply = createAction(CREATE_REPLY, ({ content, parentCommentId, postId }) => ({
//   content,
//   parentCommentId,
//   postId,
// }));
// export const deleteReply = createAction(DELETE_REPLY, ({ parentCommentId, replyId, postId }) => ({
//   parentCommentId,
//   replyId,
//   postId,
// }));

// // define saga
// const createCommentSaga = createRequestSaga(CREATE_COMMENT, commentAPI.createComment);
// const getCommentsSaga = createRequestSaga(GET_COMMENT, commentAPI.getComments);
// const deleteCommentSaga = createRequestSaga(DELETE_COMMENT, commentAPI.deleteComment);

// const createReplySaga = createRequestSaga(CREATE_REPLY, commentAPI.createReply);
// const deleteReplySaga = createRequestSaga(DELETE_REPLY, commentAPI.deleteReply);

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

//   // create reply 후에 get replies 요청
//   yield takeLatest(CREATE_REPLY, function* (action) {
//     console.log(`create reply 요청`);
//     console.log(`createReplySaga 시작`);
//     yield call(createReplySaga, action);
//     console.log(`getCommentsSaga 시작`);
//     yield call(getCommentsSaga, action);
//   });
//   // delete reply 요청
//   yield takeLatest(DELETE_REPLY, function* (action) {
//     console.log(`delete reply 요청`);
//     console.log(`deleteReplySaga 시작`);
//     yield call(deleteReplySaga, action);
//     console.log(`getCommentsSaga 시작`);
//     yield call(getCommentsSaga, action);
//   });
// }

// // init
// const initialState = {
//   commentInput: null,
//   comment: null,
//   comments: null,
//   commentError: null,
//   replyInput: null,
//   reply: null,
//   replyError: null,
// };

// // reducer
// const comment = handleActions(
//   {
//     [CHANGE_COMMENT_INPUT]: (state, { payload: commentInput }) => ({
//       ...state,
//       commentInput,
//     }),
//     [CREATE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
//       ...state,
//       comment,
//       commentError: null,
//     }),
//     [CREATE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
//       ...state,
//       comment: null,
//       commentError,
//     }),
//     [GET_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
//       ...state,
//       comments,
//       commentError: null,
//     }),
//     [GET_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
//       ...state,
//       comments: null,
//       commentError,
//     }),
//     [DELETE_COMMENT_SUCCESS]: (state) => ({
//       ...state,
//     }),
//     [DELETE_COMMENT_FAILURE]: (state) => ({
//       ...state,
//     }),
//     [CHANGE_REPLY_INPUT]: (state, { payload: replyInput }) => ({
//       ...state,
//       replyInput,
//     }),
//     [CREATE_REPLY_SUCCESS]: (state, { payload: reply }) => ({
//       ...state,
//       reply,
//       replyError: null,
//     }),
//     [CREATE_REPLY_FAILURE]: (state, { payload: replyError }) => ({
//       ...state,
//       reply: null,
//       replyError,
//     }),
//     [DELETE_REPLY_SUCCESS]: (state) => ({
//       ...state,
//     }),
//     [DELETE_REPLY_FAILURE]: (state) => ({
//       ...state,
//     }),
//   },
//   initialState,
// );

// export default comment;
