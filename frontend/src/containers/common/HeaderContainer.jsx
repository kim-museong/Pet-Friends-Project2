import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { useDispatch, useSelector } from 'react-redux';

const HeaderContainer = () => {
  const { user, light } = useSelector(({ user, theme }) => ({ user: user.user, light: theme.theme }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      alert('로그아웃 되었습니다.');
    }, 100);
  };
  return <Header user={user} onLogout={onLogout} light={light}></Header>;
};

export default HeaderContainer;
