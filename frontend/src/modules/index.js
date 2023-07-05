import { combineReducers } from 'redux';
import posts, { postsSaga } from './posts';
import sort from './sort';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import find, { emailSage } from './find';
import theme from './theme';
import post, { postSaga } from './post';
import write from './write';
import main, { mainSaga } from './main';

const rootReducer = combineReducers({
  posts,
  sort,
  loading,
  auth,
  user,
  find,
  theme,
  post,
  write,
  main,
});

export function* rootSaga() {
  yield all([postsSaga(), authSaga(), userSaga(), emailSage(), postSaga(), mainSaga()]);
}

export default rootReducer;
