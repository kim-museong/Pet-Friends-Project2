////////////////
// write post //
////////////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
// import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// define action type
const CHANGE_INPUT = 'write/CHANGE_INPUT';
const INIT_INPUT = 'write/INIT_INPUT';

// action creator
export const changeInput = createAction(CHANGE_INPUT, (key, value) => ({ key, value }));
export const initInput = createAction(INIT_INPUT);

// define saga

// init
const initialState = {
  title: '',
  content: '',
};

// reducer
const write = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    [INIT_INPUT]: (state) => initialState,
  },
  initialState,
);

export default write;
