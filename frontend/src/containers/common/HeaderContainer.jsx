import { useCallback, useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { useDispatch, useSelector } from 'react-redux';

const HeaderContainer = () => {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    // 여기에서 원하는 높이를 설정합니다.
    const scrollThreshold = 180;

    if (window.scrollY >= scrollThreshold) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const onLogout = useCallback(() => {
    dispatch(logout());
    setTimeout(() => {
      alert('로그아웃 되었습니다.');
    }, 100);
  }, [dispatch]);

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 unmount될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <Header user={user} onLogout={onLogout} theme={theme} isScrolled={isScrolled}></Header>;
};

export default HeaderContainer;
