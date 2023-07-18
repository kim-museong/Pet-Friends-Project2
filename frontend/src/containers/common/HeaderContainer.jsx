import { useCallback } from 'react';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { useDispatch, useSelector } from 'react-redux';

const HeaderContainer = () => {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
    setTimeout(() => {
      alert('로그아웃 되었습니다.');
    }, 100);
  }, [dispatch]);
  return <Header user={user} onLogout={onLogout} theme={theme}></Header>;
};

export default HeaderContainer;
