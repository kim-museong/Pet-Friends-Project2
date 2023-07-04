import styled from 'styled-components';
import Button from '../common/Button';
import { StyledInput } from '../../lib/styles/find';
import { MdPerson, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { ShowPwdBox } from '../../lib/styles/auth';
import { Footer } from '../../lib/styles/find';
import { Link } from 'react-router-dom';

const AuthFormBlock = styled.div`
  text-align: center;
  margin: 10% auto 0;

  .logo {
    font-size: 50px;
    margin-bottom: 50px;
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  }

  form {
    margin-top: 2rem;
  }

  div + div {
    margin-top: 20px;
  }
`;

const ButtonWidthMarginTop = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: 25px;
`;

const SaveUserIdBox = styled.div`
  margin: 15px 0 0 10px !important;

  display: flex;
  align-items: center;
  -webkit-tap-hightheme-color: rgba(0, 0, 0, 0);

  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #fff;
    border: 1px solid rgb(186, 186, 186);
    border-radius: 4px;
    cursor: pointer;
    height: 25px;
    outline: 0;
    width: 25px;
  }
  input[type='checkbox']::after {
    border: solid #fff;
    border-width: 0 4px 4px 0;
    content: '';
    display: none;
    height: 40%;
    left: 34%;
    position: relative;
    top: 15%;
    transform: rotate(45deg);
    width: 15%;
  }
  input[type='checkbox']:checked {
    background: rgb(255, 140, 0);
    border: rgb(255, 140, 0);
  }
  input[type='checkbox']:checked::after {
    display: block;
  }

  div {
    margin-left: 7px;
  }
`;

const InputStyle = styled(StyledInput)`
  width: 100%;
`;

const LoginBox = styled.div`
  width: 450px;
  margin: 20px auto 0;
  border-radius: 10px;
  padding: 20px;
`;

const ErrorBox = styled.div`
  height: 30px;
  font-size: 20px;
  color: red;
  margin: 35px auto 20px !important;

  div {
    text-align: left;
  }

  div + div {
    margin-top: 2px;
  }
`;

const Login = ({
  form,
  error,
  onChange,
  onSubmit,
  isChecked,
  onSaveUserId,
  theme,
  showPwd,
  onShowPwd,
  iconClick,
  checkBoxSelect,
  inputRefs,
  checkBoxRef,
}) => {
  return (
    <>
      <AuthFormBlock theme={String(theme)}>
        <Link to="/" className="logo">
          Logo
        </Link>
        <LoginBox>
          <form onSubmit={onSubmit}>
            <InputStyle theme={String(theme)}>
              <div className="icon" onClick={() => iconClick('username')}>
                <MdPerson />
              </div>
              <input
                ref={inputRefs.username}
                autoComplete="username"
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="아이디"
              />
            </InputStyle>

            <InputStyle theme={String(theme)}>
              <div className="icon" onClick={() => iconClick('password')}>
                <MdLock />
              </div>
              <input
                ref={inputRefs.password}
                autoComplete="new-password"
                name="password"
                value={form.password}
                onChange={onChange}
                type={showPwd ? 'text' : 'password'}
                placeholder="비밀번호"
              />
              <ShowPwdBox onClick={onShowPwd}>{showPwd ? <MdVisibility /> : <MdVisibilityOff />}</ShowPwdBox>
            </InputStyle>

            <SaveUserIdBox>
              <input ref={checkBoxRef} type="checkbox" checked={isChecked} onChange={onSaveUserId} />
              <div onClick={checkBoxSelect}>아이디 저장</div>
            </SaveUserIdBox>

            <ErrorBox>{error && error}</ErrorBox>

            <ButtonWidthMarginTop>로그인</ButtonWidthMarginTop>
          </form>
        </LoginBox>
      </AuthFormBlock>
      <Footer theme={String(theme)}>
        <Link to="/auth/credentials?type=findId">아이디찾기</Link>
        <Link to="/auth/credentials?type=findPwd">비밀번호 찾기</Link>
        <Link to="/auth/register">회원가입</Link>
      </Footer>
      <LoginBox></LoginBox>
    </>
  );
};

export default Login;
