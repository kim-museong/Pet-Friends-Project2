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

// action creator
export const getLikes = createAction(GET_LIKE, ({ userId, postId }) => ({
  userId,
  postId,
}));

// define saga
const getLikesSaga = createRequestSaga(GET_LIKE, likeAPI.getLikes);

export function* likeSaga() {
  // get likes 요청
  yield takeLatest(GET_LIKE, getLikesSaga);
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
  },
  initialState,
);

export default like;
