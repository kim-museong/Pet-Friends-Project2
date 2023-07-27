import styled from 'styled-components';
import Responsive from './Responsive';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { MdAccountCircle } from 'react-icons/md';
import { SiInstagram, SiFacebook, SiGithub } from 'react-icons/si';
import palette from '../../lib/styles/palette';
import { resetSearch } from '../../modules/searchOption';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { unloadPosts } from '../../modules/posts';

const HeaderBox = styled.div`
  .logo {
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: 0 auto 5px;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 2px;
    overflow: hidden;

    a {
      display: inline-block;
      width: 200px;
      height: 100px;
      background-image: url('../../images/petFriendsLogo.png');
      background-repeat: no-repeat;
      background-position: 50% 57%;
      background-size: 150%;
    }
  }

  .fixedLogo {
    a {
      display: inline-block;
      width: 200px;
      height: 100px;
      background-image: url('../../images/petFriendsFixedLogo.png');
      background-repeat: no-repeat;
      background-position: 50% 57%;
      background-size: 70%;
    }
  }
`;

const Soical = styled.div`
  border-radius: 0;
  display: flex;
  align-items: center;

  svg {
    font-size: 30px;
    margin-top: 60px;
    margin-right: 10px;
    color: ${palette.mainColor};
    cursor: pointer;
  }
`;

const FixBox = styled.div`
  width: 100%;
  position: absolute;
  top: -20%;

  .fix {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: red;
    border-radius: 0;
  }
`;

const HeaderBlock = styled.div`
  width: 100%;
  font-size: 18px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45, 45, 45)' : 'white')};
  box-shadow: 0 0 0 1px ${palette.border};
  border-radius: 0;
  z-index: 5;
`;

const Wrapper = styled(Responsive)`
  width: 70%;
  height: 3.5rem;
  display: flex;
  justify-content: ${({ isScrolled }) => (isScrolled === 'true' ? 'space-between' : 'center')} !important;
  align-items: center;
  justify-content: left;
  padding: 0;

  .right {
    display: flex;
    align-items: center;

    & svg {
      color: rgb(255, 140, 0);
    }
  }
`;

const MenuList = styled.div`
  a {
    padding: 5px 5px 10px;
    margin: 0 20px;
    border-radius: 0px;

    &:hover {
      color: ${palette.mainColor};
    }
  }

  .check {
    color: ${palette.mainColor};
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
  display: flex;
  font-size: 16px;
  margin: 9px 10px 0 0;
  cursor: pointer;
`;

const Header = ({ user, onLogout, theme, isScrolled }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(resetSearch());
    dispatch(unloadPosts());
  }, [dispatch]);

  const isHeaderVisible =
    !location.pathname.includes('/memo') &&
    !location.pathname.includes('/auth/') &&
    !location.pathname.includes('/random') &&
    !location.pathname.includes('/attendance') &&
    !location.pathname.includes('/hospital') &&
    !location.pathname.includes('editor') &&
    !location.pathname.includes('/admin/');

  return (
    <>
      {isHeaderVisible && (
        <HeaderBox>
          <div className="logo">
            <Link to="/"></Link>
            <Soical>
              <SiInstagram />
              <SiFacebook />
            </Soical>
          </div>

          <HeaderBlock theme={String(theme)}>
            <Wrapper isScrolled={String(isScrolled)}>
              <MenuList>
                <Link to="/notice" className={location.pathname === '/notice' && 'check'} onClick={() => onClick()}>
                  공지사항
                </Link>
                <Link
                  to="/information"
                  className={location.pathname === '/information' && 'check'}
                  onClick={() => onClick()}
                >
                  정보글
                </Link>
                <Link to="/picture" className={location.pathname === '/picture' && 'check'} onClick={() => onClick()}>
                  사진
                </Link>
                <Link
                  to="/community"
                  className={location.pathname === '/community' && 'check'}
                  onClick={() => onClick()}
                >
                  커뮤니티
                </Link>
                {/* 마이페이지, 관리자페이지, 로그인(회원가입) 추가 */}
              </MenuList>
            </Wrapper>
          </HeaderBlock>
          <Spacer />

          <FixBox>
            <div className={isScrolled ? 'fix' : ''}>
              <HeaderBlock theme={String(theme)}>
                <Wrapper isScrolled={String(isScrolled)}>
                  {isScrolled && (
                    <>
                      <div className="fixedLogo" style={{ width: 'auto', margin: '0' }}>
                        <Link to="/"></Link>
                      </div>
                    </>
                  )}
                  <MenuList>
                    <Link to="/notice" className={location.pathname === '/notice' && 'check'} onClick={() => onClick()}>
                      공지사항
                    </Link>
                    <Link
                      to="/information"
                      className={location.pathname === '/information' && 'check'}
                      onClick={() => onClick()}
                    >
                      정보글
                    </Link>
                    <Link
                      to="/picture"
                      className={location.pathname === '/picture' && 'check'}
                      onClick={() => onClick()}
                    >
                      사진
                    </Link>
                    <Link
                      to="/community"
                      className={location.pathname === '/community' && 'check'}
                      onClick={() => onClick()}
                    >
                      커뮤니티
                    </Link>
                    {/* 마이페이지, 관리자페이지, 로그인(회원가입) 추가 */}
                  </MenuList>
                  <div className="right">
                    {/* 홈페이지에서는 헤더부분 로그인버튼 안보이기*/}
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
                  </div>
                </Wrapper>
              </HeaderBlock>
            </div>
          </FixBox>
        </HeaderBox>
      )}
    </>
  );
};

export default Header;
