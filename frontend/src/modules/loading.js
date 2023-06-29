import { createAction, handleActions } from 'redux-actions';

// define action type
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// action creator
export const startLoading = createAction(START_LOADING, (type) => type);
export const finishLoading = createAction(FINISH_LOADING, (type) => type);

// init
const initialState = {};

// reducer
const loading = handleActions(
  {
    [START_LOADING]: (state, { payload: type }) => ({
      ...state,
      [type]: true,
    }),
    [FINISH_LOADING]: (state, { payload: type }) => ({
      ...state,
      [type]: false,
    }),
  },
  initialState,
);

export default loading;
