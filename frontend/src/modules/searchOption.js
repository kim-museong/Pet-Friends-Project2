/////////////////////////
// select searchOption //
/////////////////////////
import { createAction, handleActions } from 'redux-actions';

// define action type
const SELECT_SEARCH_OPTIONS = 'searchOption/CHANGE_SEARCH_OPTIONS';
const SELECT_SORT_TYPE = 'searchOption/SELECT_SORT_TYPE';
const SELECT_PAGE_NUMBER = 'searchOption/CHANGE_PAGE_NUMBER';
const SELECT_TAG = 'searchOption/SELECT_TAG';

// action creator
export const selectSearchOptions = createAction(SELECT_SEARCH_OPTIONS, ({ searchCategory, searchKeyword }) => ({
  searchCategory,
  searchKeyword,
}));
export const selectSortType = createAction(SELECT_SORT_TYPE, (sortType) => sortType);
export const selectPageNumber = createAction(SELECT_PAGE_NUMBER, (pageNumber) => pageNumber);
export const selectTag = createAction(SELECT_TAG, (tag) => tag);

// init
const initialState = {
  searchKeyword: null,
  searchCategory: null,
  sortType: null,
  pageNumber: null,
  tag: null,
};

// reducer
const searchOption = handleActions(
  {
    [SELECT_SEARCH_OPTIONS]: (state, { payload: searchOptions }) => ({
      ...state,
      searchCategory: searchOptions.searchCategory,
      searchKeyword: searchOptions.searchKeyword,
    }),
    [SELECT_SORT_TYPE]: (state, { payload: sortType }) => ({
      ...state,
      sortType,
    }),
    [SELECT_PAGE_NUMBER]: (state, { payload: pageNumber }) => ({
      ...state,
      pageNumber,
    }),
    [SELECT_TAG]: (state, { payload: tag }) => ({
      ...state,
      tag,
    }),
  },
  initialState,
);

export default searchOption;
