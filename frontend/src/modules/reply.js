// ///////////
// // reply //
// ///////////
// import { createAction, handleActions } from 'redux-actions';
// import createRequestSaga from '../lib/createRequestSaga';
// import * as postAPI from '../lib/api/reply';
// import { takeLatest, call } from 'redux-saga/effects';

// // define action type
// const CHANGE_REPLY_INPUT = 'reply/CHANGE_REPLY_INPUT';

// const CREATE_REPLY = 'reply/CREATE_REPLY';
// const CREATE_REPLY_SUCCESS = 'reply/CREATE_REPLY_SUCCESS';
// const CREATE_REPLY_FAILURE = 'reply/CREATE_REPLY_FAILURE';

// const GET_REPLY = 'reply/GET_REPLY';
// const GET_REPLY_SUCCESS = 'reply/GET_REPLY_SUCCESS';
// const GET_REPLY_FAILURE = 'reply/GET_REPLY_FAILURE';

// const DELETE_REPLY = 'reply/DELETE_REPLY';
// const DELETE_REPLY_SUCCESS = 'reply/DELETE_REPLY_SUCCESS';
// const DELETE_REPLY_FAILURE = 'reply/DELETE_REPLY_FAILURE';

// // action creator
// export const changeReplyInput = createAction(CHANGE_REPLY_INPUT, (input) => input);
// export const createReply = createAction(CREATE_REPLY, ({ content, parentCommentId }) => ({ content, parentCommentId }));
// export const getReplies = createAction(GET_REPLY, (parentCommentId) => parentCommentId);
// export const deleteReply = createAction(DELETE_REPLY, ({ parentCommentId, replyId }) => ({ parentCommentId, replyId }));

// // define saga
// const createReplySaga = createRequestSaga(CREATE_REPLY, postAPI.createReply);
// const getRepliesSaga = createRequestSaga(GET_REPLY, postAPI.getReplies);
// const deleteReplySaga = createRequestSaga(DELETE_REPLY, postAPI.deleteReply);
// export function* replySaga() {
//   // create reply 후에 get replies 요청
//   yield takeLatest(CREATE_REPLY, function* (action) {
//     yield call(createReplySaga, action);
//     yield call(getRepliesSaga, action);
//   });
//   // get replies 요청
//   yield takeLatest(GET_REPLY, getRepliesSaga);
//   // delete reply 요청
//   yield takeLatest(DELETE_REPLY, function* (action) {
//     yield call(deleteReplySaga, action);
//     yield call(getRepliesSaga, action);
//   });
// }

// // init
// const initialState = {
//   replyInput: null,
//   reply: null,
//   replies: {
//     commentId: null,
//     replies: null,
//   },
//   replyError: null,
//   parentCommentId: null,
// };

// // reducer
// const reply = handleActions(
//   {
//     [CHANGE_REPLY_INPUT]: (state, { payload: replyInput }) => ({
//       ...state,
//       replyInput,
//     }),
//     [CREATE_REPLY_SUCCESS]: (state, { payload: reply }) => ({
//       ...state,
//       reply,
//       replyError: null,
//       parentCommentId: reply.CommentId,
//     }),
//     [CREATE_REPLY_FAILURE]: (state, { payload: replyError }) => ({
//       ...state,
//       reply: null,
//       replyError,
//     }),
//     [GET_REPLY_SUCCESS]: (state, { payload: replies }) => ({
//       ...state,
//       replies: {
//         commentId: replies.commentId,
//         replies: replies.replies,
//       },
//       replyError: null,
//     }),
//     [GET_REPLY_FAILURE]: (state, { payload: replyError }) => ({
//       ...state,
//       replies: null,
//       replyError,
//     }),
//     [DELETE_REPLY_SUCCESS]: (state, { payload: parentCommentId }) => ({
//       ...state,
//       parentCommentId,
//     }),
//     [DELETE_REPLY_FAILURE]: (state) => ({
//       ...state,
//     }),
//   },
//   initialState,
// );

// export default reply;
