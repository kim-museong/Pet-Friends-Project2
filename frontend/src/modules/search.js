///////////////////////////
// select search kyeword //
///////////////////////////
import { createAction, handleActions } from 'redux-actions';

// define action type
const SELECT_SEARCH_KEYWORD = 'search/SELECT_SEARCH_KEYWORD';
const SELECT_SEARCH_CATEGORY = 'search/SELECT_SEARCH_CATEGORY';

// action creator
export const selectSearchKeyword = createAction(SELECT_SEARCH_KEYWORD, (searchKeyword) => searchKeyword);
export const selectSearchCategory = createAction(SELECT_SEARCH_CATEGORY, (searchCategory) => searchCategory);

// init
const initialState = {
  searchKeyword: '',
  searchCategory: '',
};

// reducer
const search = handleActions(
  {
    [SELECT_SEARCH_KEYWORD]: (state, { payload: searchKeyword }) => ({
      ...state,
      searchKeyword,
    }),
    [SELECT_SEARCH_CATEGORY]: (state, { payload: searchCategory }) => ({
      ...state,
      searchCategory,
    }),
  },
  initialState,
);

export default search;
