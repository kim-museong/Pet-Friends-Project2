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
  margin: 10px 100px 20px 0;
  font-size: 22px;
`;

const LoginFormBox = styled.div`
  width: 350px;
  height: 210px;
  border: 1px solid rgb(186, 186, 186);
  padding: 20px;
  text-align: center;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};

  p {
    padding-top: 20px;
    font-size: 20px;
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
      background: rgb(186, 186, 186);
    }
  }

  button {
    margin-top: 20px;
    margin-right: 10px;
    padding: 8px 20px;
  }
`;

const IsLoginFormBox = styled.div`
  width: 350px;
  height: 165px;
  border: 1px solid rgb(186, 186, 186);
  position: relative;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  text-align: center;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};

  p {
    font-size: 16px;
    margin-top: 20px;
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
      background: rgb(186, 186, 186);
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

const Menu = styled.div`
  width: 350px;
  button {
    display: inline-block;
    width: 33.33%;
    padding: 10px;
    border-radius: 0;
  }

  button:first-child {
    border-radius: 0 0 0 4px;
  }

  button:last-child {
    border-radius: 0 0 4px 0;
  }
`;

const FindBox = styled.div`
  margin-top: 20px;
  font-size: 14px;
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

          <Menu>
            <Button>마이페이지</Button>
            <Button>등급관리</Button>
            <Button>정보수정</Button>
          </Menu>
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
