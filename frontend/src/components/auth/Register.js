import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

import { MdPerson, MdLock, MdVisibility, MdVisibilityOff, MdEmail } from 'react-icons/md';
import { useState } from 'react';
import { StyledInput } from '../../lib/styles/find';
import { ShowPwdBox } from '../../lib/styles/auth';

const AuthFormBlock = styled.div`
  text-align: center;
  margin: 50px auto;

  a {
    font-size: 50px;
    margin-bottom: 50px;
  }

  form {
    margin-top: 2rem;
  }
`;

const ButtonWidthMarginTop = styled(Button)`
  width: 406px;
  height: 48px;
  margin-top: 1rem;
`;

const RegisterBox = styled.div`
  width: 600px;
  margin: 20px auto;
  padding: 10px;

  p {
    width: 70%;
    margin: 0 auto;
    text-align: left;
  }

  .message {
    font-size: 14px;
    color: rgb(150, 150, 150);
  }
`;

const ErrorBox = styled.div`
  width: 70%;
  height: 30px;
  font-size: 14px;
  color: red;
  margin: 5px auto;
  div {
    text-align: left;
  }

  div + div {
    margin-top: 2px;
  }
`;

const Register = ({ form, onChange, onSubmit, error, theme, iconClick, inputRefs, focusOut, sendPhone }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdCf, setShowPwdCf] = useState(false);

  const { errorUserId, errorPwd, errorPwdCf, errorEmail, errorNickname } = error;

  const onShowPwd = () => {
    setShowPwd((prev) => !prev);
  };

  const onShowPwdCf = () => {
    setShowPwdCf((prev) => !prev);
  };

  return (
    <>
      <AuthFormBlock>
        <Link to="/">LOGO</Link>
        <form onSubmit={onSubmit}>
          <RegisterBox>
            <StyledInput theme={String(theme)} className={errorUserId && 'errorUserId'}>
              <div className="icon" onClick={() => iconClick('username')}>
                <MdPerson />
              </div>
              <input
                autoFocus
                ref={inputRefs.username}
                autoComplete="username"
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="아이디"
                onBlur={focusOut}
              />
            </StyledInput>
            <StyledInput theme={String(theme)} className={errorPwd && 'errorPwd'}>
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
                onBlur={focusOut}
              />
              <ShowPwdBox onClick={onShowPwd}>{showPwd ? <MdVisibility /> : <MdVisibilityOff />}</ShowPwdBox>
            </StyledInput>
            <StyledInput theme={String(theme)} className={errorPwdCf && 'errorPwdCf'}>
              <div className="icon" onClick={() => iconClick('passwordConfirm')}>
                <MdLock />
              </div>
              <input
                ref={inputRefs.passwordConfirm}
                autoComplete="new-password"
                name="passwordConfirm"
                value={form.passwordConfirm}
                onChange={onChange}
                type={showPwdCf ? 'text' : 'password'}
                placeholder="비밀번호확인"
              />
              <ShowPwdBox onClick={onShowPwdCf}>{showPwdCf ? <MdVisibility /> : <MdVisibilityOff />}</ShowPwdBox>
            </StyledInput>
            <ErrorBox>
              <div>{errorUserId && `・${errorUserId}`}</div>
              <div>{errorPwd && `・${errorPwd}`}</div>
            </ErrorBox>
          </RegisterBox>

          <RegisterBox>
            <StyledInput theme={String(theme)} className={errorNickname && 'errorNickname'}>
              <div className="icon" onClick={() => iconClick('nickname')}>
                <MdPerson />
              </div>
              <input
                ref={inputRefs.nickname}
                autoComplete="nickname"
                name="nickname"
                value={form.nickname}
                onChange={onChange}
                placeholder="이름"
                onBlur={focusOut}
              />
            </StyledInput>

            <StyledInput theme={String(theme)} className={errorEmail && 'errorEmail'}>
              <div className="icon" onClick={() => iconClick('email')}>
                <MdEmail />
              </div>
              <input
                ref={inputRefs.email}
                autoComplete="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="[선택] 비밀번호 분실 시 확인용 이메일"
                onBlur={focusOut}
              />
            </StyledInput>

            <StyledInput theme={String(theme)}>
              <div className="icon">
                <MdEmail />
              </div>
              <input
                type="tel"
                autoComplete="phone"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="휴대전화번호"
              />
              <button onClick={sendPhone}>전송</button>
            </StyledInput>

            <ErrorBox>
              <div>{errorNickname && `・${errorNickname}`}</div>
              <div>{errorEmail && `・${errorEmail}`}</div>
            </ErrorBox>
          </RegisterBox>

          <ButtonWidthMarginTop>회원가입</ButtonWidthMarginTop>
        </form>
      </AuthFormBlock>
    </>
  );
};

export default Register;
