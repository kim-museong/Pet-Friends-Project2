import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// ------- 약관동의 ----------
const CHECK_AGREE = 'auth/CHECK_AGREE';
const ALL_CHECK = 'auth/ALL_CHECK';

// --------회원가입 순서 -----------
const NEXT_STEP = 'auth/NEXT_STEP';
const CHANGE_STEP = 'auth/CHANGE_STEP';
const INITNUMBER = 'auth/INITNUMBER';

const [PHONE, PHONE_SUCCESS, PHONE_FAILURE] = createRequestActionTypes('auth/PHONE');

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

export const nextStep = createAction(NEXT_STEP);
export const changeStep = createAction(CHANGE_STEP, (number) => number);
export const initNumber = createAction(INITNUMBER);

export const checkPhone = createAction(PHONE, (phone) => phone);

export const register = createAction(REGISTER, ({ username, password, email, nickname, phone }) => ({
  username,
  password,
  email,
  nickname,
  phone,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

export const changeError = createAction(CHANGE_ERROR, ({ key, value }) => ({
  key,
  value,
}));

const checkPhoneSaga = createRequestSaga(PHONE, authAPI.phone);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(PHONE, checkPhoneSaga);
}

export const initialState = {
  register: {
    agree: {
      all: false,
      tos: false,
      privacy: false,
      location: false,
      benefit: false,
    },
    step: 1,
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    nickname: '',
    phone: '',
    certification: '',
    certificationNumber: '',
    error: {
      errorUserId: null,
      errorPwd: null,
      errorPwdCf: null,
      errorEmail: null,
      errorNickname: null,
      errorPhone: null,
      errorConfirm: null,
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
    [ALL_CHECK]: (state) => {
      const isAllChecked =
        state.register.agree.all &&
        state.register.agree.tos &&
        state.register.agree.privacy &&
        state.register.agree.location &&
        state.register.agree.benefit;

      return {
        ...state,
        register: {
          ...state.register,
          agree: {
            all: !isAllChecked,
            tos: !isAllChecked,
            privacy: !isAllChecked,
            location: !isAllChecked,
            benefit: !isAllChecked,
          },
        },
      };
    },
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
    [NEXT_STEP]: (state) => ({
      ...state,
      register: {
        ...state.register,
        step: state.register.step + 1,
      },
    }),
    [CHANGE_STEP]: (state, { payload: number }) => ({
      ...state,
      register: {
        ...state.register,
        step: number,
      },
    }),
    [INITNUMBER]: (state) => ({
      ...state,
      register: {
        ...state.register,
        certificationNumber: '',
      },
    }),
    [PHONE_SUCCESS]: (state, { payload: phone }) => ({
      ...state,
      register: {
        ...state.register,
        certificationNumber: phone,
      },
    }),
    [PHONE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      register: {
        ...state.register,
        sendPhone: null,
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
