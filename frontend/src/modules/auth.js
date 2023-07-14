import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const CHECK_AGREE = 'auth/CHECK_AGREE';
const ALL_CHECK = 'auth/ALL_CHECK';
const ISCONFIRM = 'auth/ISCONFIRM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

const CHANGE_ERROR = 'auth/CHANGE_ERROR';

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form,
  key,
  value,
}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const checkAgree = createAction(CHECK_AGREE);
export const allCheck = createAction(ALL_CHECK);
export const isConfirm = createAction(ISCONFIRM);

export const register = createAction(REGISTER, ({ username, password, email, nickname }) => ({
  username,
  password,
  email,
  nickname,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

export const changeError = createAction(CHANGE_ERROR, ({ key, value }) => ({
  key,
  value,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

export const initialState = {
  register: {
    agree: {
      tos: false,
      privacy: false,
      location: false,
      benefit: false,
    },
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    nickname: '',
    error: {
      errorUserId: null,
      errorPwd: null,
      errorPwdCf: null,
      errorEmail: null,
      errorNickname: null,
    },
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [CHANGE_ERROR]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft.register.error = {
          ...draft.register.error,
          [key]: value,
        };
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    [ALL_CHECK]: (state) => ({
      ...state,
      register: {
        ...state.register,
        agree: {
          ...state.register.agree,
          tos: !state.register.agree.tos,
          privacy: !state.register.agree.privacy,
          location: !state.register.agree.location,
          benefit: !state.register.agree.benefit,
          confirm: false,
        },
      },
    }),
    [CHECK_AGREE]: (state, { payload: name }) => ({
      ...state,
      register: {
        ...state.register,
        agree: {
          ...state.register.agree,
          [name]: !state.register.agree[name],
        },
      },
    }),
    [ISCONFIRM]: (state) => ({
      ...state,
      register: {
        ...state.register,
        agree: {
          ...state.register.agree,
          confirm: true,
        },
      },
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),

    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
