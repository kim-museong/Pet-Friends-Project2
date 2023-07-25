import styled from 'styled-components';
import Responsive from './Responsive';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { MdAccountCircle } from 'react-icons/md';
import palette from '../../lib/styles/palette';

const HeaderBlock = styled.div`
  width: 100%;
  font-size: 18px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45, 45, 45)' : 'white')};
  box-shadow: 0 0 0 1px ${palette.border};
  border-radius: 0;
  z-index: 5;
`;

const Wrapper = styled(Responsive)`
  width: 50%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;

    & svg {
      color: rgb(255, 140, 0);
    }
  }
`;

const MenuList = styled.div`
  font-weight: bold;

  a {
    padding: 5px 10px;
    margin: 0 20px;
    border-radius: 0;

    &:hover {
      border-bottom: 2px solid ${palette.mainColor};
    }
  }

  .check {
    border-bottom: 2px solid ${palette.mainColor};
  }
`;

const Spacer = styled.div`
  height: 2rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Profile = styled.div`
  font-size: 32px;
  margin: 9px 10px 0 0;
  cursor: pointer;
`;

const Header = ({ user, onLogout, theme }) => {
  const location = useLocation();

  const isHeaderVisible =
    !location.pathname.includes('/memo') &&
    !location.pathname.includes('/auth/') &&
    !location.pathname.includes('/random') &&
    !location.pathname.includes('/admin/');

  return (
    <>
      {isHeaderVisible && (
        <>
          <Link to="/" className="logo">
            펫프렌즈
          </Link>
          <Spacer />
          <HeaderBlock theme={String(theme)}>
            <Wrapper>
              <MenuList>
                <Link to="/notice" className={location.pathname === '/notice' && 'check'}>
                  공지사항
                </Link>
                <Link to="/information" className={location.pathname === '/information' && 'check'}>
                  정보글
                </Link>
                <Link to="/picture" className={location.pathname === '/picture' && 'check'}>
                  사진
                </Link>
                <Link to="/community" className={location.pathname === '/community' && 'check'}>
                  커뮤니티
                </Link>
                {/* 마이페이지, 관리자페이지, 로그인(회원가입) 추가 */}
              </MenuList>
              <div className="right">
                {/* 홈페이지에서는 헤더부분 로그인버튼 안보이기*/}
                {location.pathname !== '/' && (
                  <>
                    {user ? (
                      <>
                        <Profile>
                          <MdAccountCircle />
                        </Profile>
                        <UserInfo>{user.userId} 님</UserInfo>
                        <Button onClick={onLogout}>로그아웃</Button>
                      </>
                    ) : (
                      <>
                        <Button to="/auth/login">로그인</Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </Wrapper>
          </HeaderBlock>
          <Spacer />
        </>
      )}
    </>
  );
};

export default Header;
