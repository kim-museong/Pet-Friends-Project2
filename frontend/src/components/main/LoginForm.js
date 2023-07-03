import styled from 'styled-components';
import Button from '../../components/common/Button';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Profile = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginFormBox = styled.div`
  border: 1px solid rgb(186, 186, 186);
  margin-top: 2rem;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(40,40,40)' : 'white')};

  p {
    padding-top: 20px;
    font-size: 20px;
  }

  .login {
    display: block;
    width: 80%;
    background: rgb(255, 140, 0);
    color: white;
    padding: 15px 10px;
    margin: 20px auto 10px;
    font-weight: bold;
    font-size: 20px;

    &:hover {
      background: rgb(186, 186, 186);
    }
  }
`;

const FindBox = styled.div`
  margin-top: 20px;
  font-size: 20px;
  color: ${({ theme }) => (theme === 'true' ? 'rgb(186,186,186)' : 'rgb(110,110,110)')};

  a {
    color: ${({ theme }) => (theme === 'true' ? 'rgb(186,186,186)' : 'rgb(110,110,110)')};
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
          <LoginFormBox theme={String(theme)}>
            <Profile>
              <MdAccountCircle />
              <UserInfo>{user.userId} 님</UserInfo>
            </Profile>
            <Button>마이페이지</Button>
            <Button onClick={onLogout}>로그아웃</Button>
          </LoginFormBox>
        </>
      ) : (
        <LoginFormBox theme={String(theme)}>
          <p>사이트를 더 편리하게 이용하세요.</p>
          <Link to="/auth/login" className="login">
            로그인
          </Link>
          <FindBox theme={String(theme)}>
            <Link to="/auth/credentials">아이디 찾기</Link>
            <Link to="/auth/credentials">비밀번호 찾기</Link>
            <Link to="/auth/register">회원가입</Link>
          </FindBox>
        </LoginFormBox>
      )}
    </>
  );
};

export default LoginForm;
