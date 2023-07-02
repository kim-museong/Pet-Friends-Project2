//////////////////////
// select sort type //
//////////////////////

// state로 관리할 필요가 있는 값인지 결정

import { createAction, handleActions } from 'redux-actions';

// define action type
const SELECT_SORT_TYPE = 'sort/SELECT_SORT_TYPE';

// action creator
export const selectSortType = createAction(SELECT_SORT_TYPE, (sortType) => sortType);

// init
const initialState = {
  sortType: 'date',
};

// reducer
const sort = handleActions(
  {
    [SELECT_SORT_TYPE]: (state, { payload: sortType }) => ({
      ...state,
      sortType,
    }),
  },
  initialState,
);

export default sort;
