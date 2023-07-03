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
  }

  form {
    margin-top: 2rem;
  }

  div + div {
    margin-top: 20px;
  }
`;

const ButtonWidthMarginTop = styled(Button)`
  height: 54px;
`;

const SaveUserIdBox = styled.div`
  font-size: 12px;
  margin-top: 10px !important;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #fff;
    border: 1px solid rgb(186, 186, 186);
    border-radius: 4px;
    cursor: pointer;
    height: 16px;
    outline: 0;
    width: 16px;
  }
  input[type='checkbox']::after {
    border: solid #fff;
    border-width: 0 2px 2px 0;
    content: '';
    display: none;
    height: 40%;
    left: 40%;
    position: relative;
    top: 20%;
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
    margin: 0 0 1px 2px;
  }
`;

const SocialBox = styled.div`
  display: flex;
  justify-content: center;
`;

const InputStyle = styled(StyledInput)`
  width: 100%;
`;

const LoginBox = styled.div`
  width: 360px;
  margin: 20px auto 0;
  border-radius: 10px;
  padding: 20px;
`;

const ErrorBox = styled.div`
  height: 30px;
  font-size: 12px;
  color: red;
  margin: 15px auto 5px !important;

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
  light,
  showPwd,
  onShowPwd,
  iconClick,
  checkBoxSelect,
  inputRefs,
  checkBoxRef,
}) => {
  return (
    <>
      <AuthFormBlock>
        <Link to="/" className="logo">
          Logo
        </Link>
        <LoginBox>
          <form onSubmit={onSubmit}>
            <InputStyle light={light}>
              <div onClick={() => iconClick('username')}>
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

            <InputStyle light={light}>
              <div onClick={() => iconClick('password')}>
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

            <ButtonWidthMarginTop cyan fullWidth>
              로그인
            </ButtonWidthMarginTop>
          </form>
        </LoginBox>
      </AuthFormBlock>
      <Footer light={light}>
        <Link to="/findId">아이디찾기</Link>
        <Link to="/findPASSWORD">비밀번호찾기</Link>
        <Link to="/auth/register">회원가입</Link>
      </Footer>
      <LoginBox></LoginBox>
    </>
  );
};

export default Login;
