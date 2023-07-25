/////////
// api //
/////////
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as API from '../lib/api/api';
import { takeLatest } from 'redux-saga/effects';

// define action type
const GET_HOSPITAL_LIST = 'api/GET_HOSPITAL_LIST';
const GET_HOSPITAL_LIST_SUCCESS = 'api/GET_HOSPITAL_LIST_SUCCESS';
const GET_HOSPITAL_LIST_FAILURE = 'api/GET_HOSPITAL_LIST_FAILURE';

const UPDATE_HOSPITAL_LIST = 'api/UPDATE_HOSPITAL_LIST';
const UPDATE_HOSPITAL_LIST_SUCCESS = 'api/UPDATE_HOSPITAL_LIST_SUCCESS';
const UPDATE_HOSPITAL_LIST_FAILURE = 'api/UPDATE_HOSPITAL_LIST_FAILURE';

// action creator
export const getHospitalList = createAction(GET_HOSPITAL_LIST);
export const updateHospitalList = createAction(UPDATE_HOSPITAL_LIST, ({ hospitalId, latitude, longitude }) => ({
  hospitalId,
  latitude,
  longitude,
}));

// define saga
const getHospitalListSaga = createRequestSaga(GET_HOSPITAL_LIST, API.getHospitalList);
const updateHospitalListSaga = createRequestSaga(UPDATE_HOSPITAL_LIST, API.updateHospitalList);

export function* apiSaga() {
  // get hospital list 요청
  yield takeLatest(GET_HOSPITAL_LIST, getHospitalListSaga);
  // update hospital list 요청
  yield takeLatest(UPDATE_HOSPITAL_LIST, updateHospitalListSaga);
}

// init
const initialState = {
  hospitalList: [],
  hospitalError: null,
  hospital: null,
};

// reducer
const api = handleActions(
  {
    [GET_HOSPITAL_LIST_SUCCESS]: (state, { payload: hospitalList }) => ({
      ...state,
      hospitalList,
      hospitalError: null,
    }),
    [GET_HOSPITAL_LIST_FAILURE]: (state, { payload: hospitalError }) => ({
      ...state,
      hospitalList: null,
      hospitalError,
    }),
    [UPDATE_HOSPITAL_LIST_SUCCESS]: (state, { payload: hospital }) => ({
      ...state,
      hospital,
      hospitalError: null,
    }),
    [UPDATE_HOSPITAL_LIST_FAILURE]: (state, { payload: hospitalError }) => ({
      ...state,
      hospitalError,
    }),
  },
  initialState,
);

export default api;
