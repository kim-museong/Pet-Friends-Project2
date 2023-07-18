import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import posts, { postsSaga } from './posts';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import find, { emailSage } from './find';
import theme from './theme';
import post, { postSaga } from './post';
import write, { writeSaga } from './write';
import main, { mainSaga } from './main';
import searchOption from './searchOption';
import comment, { commentSaga } from './comment';
// import reply, { replySaga } from './reply';

const rootReducer = combineReducers({
  posts,
  loading,
  auth,
  user,
  find,
  theme,
  post,
  write,
  main,
  searchOption,
  comment,
  // reply,
});

// redux-persist로 새로고침시 state 유지
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'find'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export function* rootSaga() {
  yield all([
    postsSaga(),
    authSaga(),
    userSaga(),
    emailSage(),
    postSaga(),
    mainSaga(),
    writeSaga(),
    commentSaga(),
    // replySaga(),
  ]);
}

export default persistedReducer;
