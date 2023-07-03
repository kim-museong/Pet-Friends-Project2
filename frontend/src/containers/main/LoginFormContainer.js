import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/user';
import LoginForm from '../../components/main/LoginForm';

const LoginFormContainer = () => {
  const { user, light } = useSelector(({ user, theme }) => ({ user: user.user, light: theme.theme }));
  console.log(light);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      alert('로그아웃 되었습니다.');
    }, 100);
  };

  return <LoginForm user={user} onLogout={onLogout} light={light} />;
};

export default LoginFormContainer;
