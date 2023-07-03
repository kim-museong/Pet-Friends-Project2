import styled from 'styled-components';
import Responsive from './Responsive';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { MdAccountCircle } from 'react-icons/md';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  font-size: 20px;
  padding: 10px 0;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(30, 30, 30)' : 'white')};
  box-shadow: 0 0 3px 1px ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  a {
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'rgb(50,50,50)')};
  }
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 2rem;
    font-weight: bold;
    letter=spacing: 2px;
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
  a + a {
    margin-left: 20px;
  }
`;

const Spacer = styled.div`
  height: 4rem;
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
  return (
    <>
      <HeaderBlock theme={String(theme)}>
        <Wrapper>
          <Link to="/" className="logo">
            REACTERS
          </Link>
          <MenuList>
            <Link to="/">홈</Link>
            <Link to="/notice">공지사항</Link>
            <Link to="/information">정보글</Link>
            <Link to="/picture">사진</Link>
            <Link to="/community">커뮤니티</Link>
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
  );
};

export default Header;
