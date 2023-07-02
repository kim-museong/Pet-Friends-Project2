import { combineReducers } from 'redux';
import posts, { postsSaga } from './posts';
import sort from './sort';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  posts,
  sort,
});

export function* rootSaga() {
  yield all([postsSaga()]);
}

export default rootReducer;
