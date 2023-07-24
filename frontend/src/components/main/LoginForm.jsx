import styled from 'styled-components';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import palette from '../../lib/styles/palette';

const UserInfo = styled.div`
  font-weight: 800;
`;

const Profile = styled.div`
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

const LoginFormBox = styled.div`
  height: 180px;
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  padding: 20px 40px;
  text-align: center;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};

  p {
    padding-top: 5px;
    font-size: 18px;
  }

  .login {
    display: block;
    width: 100%;
    background: ${palette.mainColor};
    color: white;
    padding: 15px 10px;
    margin: 15px auto 10px;
    font-weight: bold;
    font-size: 20px;

    &:hover {
      background: ${palette.border};
    }
  }

  button {
    margin-top: 20px;
    margin-right: 10px;
    padding: 8px 20px;
  }
`;

const IsLoginFormBox = styled.div`
  height: 180px;
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  padding: 20px 40px;
  position: relative;
  text-align: center;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};

  p {
    font-size: 16px;
  }

  .login {
    display: block;
    width: 100%;
    background: ${palette.mainColor};
    color: white;
    padding: 15px 10px;
    margin: 20px auto 10px;
    font-weight: bold;
    font-size: 20px;

    &:hover {
      background: ${palette.border};
    }
  }

  button {
    display: flex;
    align-items: center;
    padding-right: 8px;
    svg {
      margin-left: 5px;
    }
  }
`;

const FindBox = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: ${({ theme }) => (theme === 'true' ? `${palette.border}` : 'rgb(110,110,110)')};

  a {
    color: ${({ theme }) => (theme === 'true' ? `${palette.border}` : 'rgb(110,110,110)')};
  }

  a:hover {
    text-decoration: underline;
  }

  a + a:before {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    content: '|';
  }
`;

const LoginForm = ({ user, onLogout, theme }) => {
  return (
    <>
      {user ? (
        <>
          <IsLoginFormBox theme={String(theme)}>
            <Profile>
              <p>안녕하세요!</p>
              <UserInfo>{user.nickname} 님</UserInfo>
            </Profile>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <div>등급: 일반</div>
                <div>포인트: 0</div>
              </div>
              <div>
                <div>팔로워: 0</div>
                <div>팔로우: 0</div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: '5%', left: '68%' }}>
              <Button onClick={onLogout}>
                로그아웃
                <MdLogout />
              </Button>
            </div>
          </IsLoginFormBox>
        </>
      ) : (
        <LoginFormBox theme={String(theme)}>
          <p>사이트를 더 편리하게 이용하세요.</p>
          <Link to="/auth/login" className="login">
            로그인
          </Link>
          <FindBox theme={String(theme)}>
            <Link to="/auth/credentials?type=findId">아이디 찾기</Link>
            <Link to="/auth/credentials?type=findPwd">비밀번호 찾기</Link>
            <Link to="/auth/register">회원가입</Link>
          </FindBox>
        </LoginFormBox>
      )}
    </>
  );
};

export default LoginForm;
