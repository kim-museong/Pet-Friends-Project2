import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/user';
import LoginForm from '../../components/main/LoginForm';

const LoginFormContainer = () => {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      alert('로그아웃 되었습니다.');
    }, 100);
  };

  return <LoginForm user={user} onLogout={onLogout} theme={theme} />;
};

export default LoginFormContainer;
