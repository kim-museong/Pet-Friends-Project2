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

const GET_RANDOM_DOG_PICTURE = 'api/GET_RANDOM_DOG_PICTURE';
const GET_RANDOM_DOG_PICTURE_SUCCESS = 'api/GET_RANDOM_DOG_PICTURE_SUCCESS';
const GET_RANDOM_DOG_PICTURE_FAILURE = 'api/GET_RANDOM_DOG_PICTURE_FAILURE';

// action creator
export const getHospitalList = createAction(GET_HOSPITAL_LIST);
export const updateHospitalList = createAction(UPDATE_HOSPITAL_LIST, ({ hospitalId, latitude, longitude }) => ({
  hospitalId,
  latitude,
  longitude,
}));
export const getRandomDogPicture = createAction(GET_RANDOM_DOG_PICTURE);

// define saga
const getHospitalListSaga = createRequestSaga(GET_HOSPITAL_LIST, API.getHospitalList);
const updateHospitalListSaga = createRequestSaga(UPDATE_HOSPITAL_LIST, API.updateHospitalList);
const getRandomDogPictureSaga = createRequestSaga(GET_RANDOM_DOG_PICTURE, API.getRandomDogPicture);

export function* apiSaga() {
  // get hospital list 요청
  yield takeLatest(GET_HOSPITAL_LIST, getHospitalListSaga);
  // update hospital list 요청
  yield takeLatest(UPDATE_HOSPITAL_LIST, updateHospitalListSaga);
  // get random dog picture 요청
  yield takeLatest(GET_RANDOM_DOG_PICTURE, getRandomDogPictureSaga);
}

// init
const initialState = {
  hospitalList: [],
  hospitalError: null,
  hospital: null,
  dogPicture: null,
  dogPictureError: null,
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
    [GET_RANDOM_DOG_PICTURE_SUCCESS]: (state, { payload: dogPicture }) => ({
      ...state,
      dogPicture,
    }),
    [GET_RANDOM_DOG_PICTURE_FAILURE]: (state, { payload: dogPictureError }) => ({
      ...state,
      dogPictureError,
    }),
  },
  initialState,
);

export default api;
