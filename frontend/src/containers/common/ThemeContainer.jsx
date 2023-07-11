import React, { useCallback } from 'react';
import Theme from '../../components/common/Theme';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../modules/theme';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const ThemeContainer = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const onClick = useCallback(() => {
    dispatch(changeTheme());
  }, [dispatch]);

  return (
    <>
      <Theme onClick={onClick} theme={theme} />
    </>
  );
};

export default React.memo(ThemeContainer);
