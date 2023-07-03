import { createAction, handleActions } from 'redux-actions';

// define action type
const CHANGE_THEME = 'theme/CHANGE_THEME';

// action creator
export const changeTheme = createAction(CHANGE_THEME);

// init
const initialState = {
  //밝음 f
  theme: false,
};

// reducer
const theme = handleActions(
  {
    [CHANGE_THEME]: (state) => ({
      ...state,
      theme: !state.theme,
    }),
  },
  initialState,
);

export default theme;
