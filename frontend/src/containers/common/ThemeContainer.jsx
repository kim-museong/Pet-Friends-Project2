import React, { useCallback } from 'react';
import Theme from '../../components/common/Theme';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../modules/theme';

const ThemeContainer = () => {
  const { light } = useSelector(({ theme }) => ({
    light: theme.theme,
  }));
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(changeTheme());
  }, [dispatch]);

  return (
    <>
      <Theme light={light} onClick={onClick} />
    </>
  );
};

export default ThemeContainer;
