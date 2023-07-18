import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/user';
import LoginForm from '../../components/main/LoginForm';
import { useCallback } from 'react';

const LoginFormContainer = () => {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
    setTimeout(() => {
      alert('로그아웃 되었습니다.');
    }, 100);
  }, [dispatch]);

  return <LoginForm user={user} onLogout={onLogout} theme={theme} />;
};

export default LoginFormContainer;
