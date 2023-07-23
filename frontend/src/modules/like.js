//////////
// like //
//////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as likeAPI from '../lib/api/like';
import { takeLatest } from 'redux-saga/effects';

// define action type
const GET_LIKE = 'like/GET_LIKE';
const GET_LIKE_SUCCESS = 'like/GET_LIKE_SUCCESS';
const GET_LIKE_FAILURE = 'like/GET_LIKE_FAILURE';

const ADD_LIKE = 'like/ADD_LIKE';
const ADD_LIKE_SUCCESS = 'like/ADD_LIKE_SUCCESS';
const ADD_LIKE_FAILURE = 'like/ADD_LIKE_FAILURE';

const DELETE_LIKE = 'like/DELETE_LIKE';
const DELETE_LIKE_SUCCESS = 'like/DELETE_LIKE_SUCCESS';
const DELETE_LIKE_FAILURE = 'like/DELETE_LIKE_FAILURE';

// action creator
export const getLikes = createAction(GET_LIKE, ({ userId, postId }) => ({
  userId,
  postId,
}));
export const addLike = createAction(ADD_LIKE, ({ userId, postId, targetType, targetId }) => ({
  userId,
  postId,
  targetType,
  targetId,
}));
export const deleteLike = createAction(DELETE_LIKE, ({ userId, targetType, targetId, postId }) => ({
  userId,
  targetType,
  targetId,
  postId,
}));

// define saga
const getLikesSaga = createRequestSaga(GET_LIKE, likeAPI.getLikes);
const addLikeSaga = createRequestSaga(ADD_LIKE, likeAPI.addLike);
const deleteLikeSaga = createRequestSaga(DELETE_LIKE, likeAPI.deleteLike);

export function* likeSaga() {
  // get likes 요청
  yield takeLatest(GET_LIKE, getLikesSaga);
  // add like 요청
  yield takeLatest(ADD_LIKE, addLikeSaga);
  // delete like 요청
  yield takeLatest(DELETE_LIKE, deleteLikeSaga);
}

// init
const initialState = {
  likes: null,
  likeError: null,
};

// reducer
const like = handleActions(
  {
    [GET_LIKE_SUCCESS]: (state, { payload: likes }) => ({
      ...state,
      likes,
      likeError: null,
    }),
    [GET_LIKE_FAILURE]: (state, { payload: likeError }) => ({
      ...state,
      likes: null,
      likeError,
    }),
    [ADD_LIKE_SUCCESS]: (state, { payload: likes }) => ({
      ...state,
      likes,
      likeError: null,
    }),
    [ADD_LIKE_FAILURE]: (state, { payload: likeError }) => ({
      ...state,
      likes: null,
      likeError,
    }),
    [DELETE_LIKE_SUCCESS]: (state, { payload: likes }) => ({
      ...state,
      likes,
      likeError: null,
    }),
    [DELETE_LIKE_FAILURE]: (state, { payload: likeError }) => ({
      ...state,
      likes: null,
      likeError,
    }),
  },
  initialState,
);

export default like;
