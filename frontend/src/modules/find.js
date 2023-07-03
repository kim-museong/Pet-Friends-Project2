import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as Find from '../lib/api/find';
import { takeLatest } from 'redux-saga/effects';

//액션 정의
const CHANGE_INPUT = 'find/CHANGE_INPUT';
const INITIALIZE_FORM = 'find/INITIALIZE_FORM';
const [EMAIL, EMAIL_SUCCESS, EMIAL_FAILURE] =
  createRequestActionTypes('find/EMAIL');
const ISALERT = 'find/ISALERT';

//액션 생성
export const changeInput = createAction(
  CHANGE_INPUT,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const checkEmail = createAction(EMAIL, ({ email, userId }) => ({
  email,
  userId,
}));
export const isAlert = createAction(
  ISALERT,
  ({ result, isResult, valid, isConfirm }) => ({
    result,
    isResult,
    valid,
    isConfirm,
  }),
);

//초기값생성
const initialState = {
  findId: {
    nickname: '',
    userId: '',
    email: '',
  },
  emailCheck: {
    userId: '',
    email: '',
    phone: '',
    validConfirm: '',
    password: '',
    passwordConfirm: '',
  },
  init: {
    result: '',
    isResult: false,
    valid: false,
    isConfirm: false,
  },
  isemail: null,
  isUserId: null,
  emailError: null,
};

//사가생성
const checkEmailSaga = createRequestSaga(EMAIL, Find.checkEmail);
export function* emailSage() {
  yield takeLatest(EMAIL, checkEmailSaga);
}
//액션 기능
const find = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [EMAIL_SUCCESS]: (state, { payload: email, userId }) => ({
      ...state,
      isemail: email,
      isUserId: userId,
      emailError: null,
    }),
    [EMIAL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      emailError: error,
    }),
    [ISALERT]: (
      state,
      { payload: { result, isResult, valid, isConfirm } },
    ) => ({
      ...state,
      init: {
        result,
        isResult,
        valid,
        isConfirm,
      },
    }),
  },
  initialState,
);

export default find;
