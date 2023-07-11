/////////////////
// select page //
/////////////////
import { createAction, handleActions } from 'redux-actions';

// define action type
const CHANGE_PAGE_NUMBER = 'pagination/CHANGE_PAGE_NUMBER';

// action creator
export const changePageNumber = createAction(CHANGE_PAGE_NUMBER, (pageNumber) => pageNumber);

// init
const initialState = {
  pageNumber: null,
};

// reducer
const pagination = handleActions(
  {
    [CHANGE_PAGE_NUMBER]: (state, { payload: pageNumber }) => ({
      ...state,
      pageNumber,
    }),
  },
  initialState,
);
export default pagination;
