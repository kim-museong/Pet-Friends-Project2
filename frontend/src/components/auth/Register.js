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
  width: 384px;
  height: 48px;
  margin-top: 1rem;
`;

const RegisterBox = styled.div`
  width: 500px;
  margin: 0px auto;
  border-radius: 10px;
  padding: 10px;
`;

const ErrorBox = styled.div`
  width: 350px;
  height: 30px;
  font-size: 12px;
  color: red;
  margin: 5px auto 20px;

  div {
    text-align: left;
  }

  div + div {
    margin-top: 2px;
  }
`;

const Register = ({ form, onChange, onSubmit, error, light }) => {
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
            <StyledInput light={light} className={errorUserId && 'errorUserId'}>
              <div>
                <MdPerson />
              </div>
              <input
                autoComplete="username"
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="아이디"
              />
            </StyledInput>
            <StyledInput light={light} className={errorPwd && 'errorPwd'}>
              <div>
                <MdLock />
              </div>
              <input
                autoComplete="new-password"
                name="password"
                value={form.password}
                onChange={onChange}
                type={showPwd ? 'text' : 'password'}
                placeholder="비밀번호"
              />
              <ShowPwdBox onClick={onShowPwd}>{showPwd ? <MdVisibility /> : <MdVisibilityOff />}</ShowPwdBox>
            </StyledInput>
            <StyledInput light={light} className={errorPwdCf && 'errorPwdCf'}>
              <div>
                <MdLock />
              </div>
              <input
                autoComplete="new-password"
                name="passwordConfirm"
                value={form.passwordConfirm}
                onChange={onChange}
                type={showPwdCf ? 'text' : 'password'}
                placeholder="비밀번호확인"
              />
              <ShowPwdBox onClick={onShowPwdCf}>{showPwdCf ? <MdVisibility /> : <MdVisibilityOff />}</ShowPwdBox>
            </StyledInput>
          </RegisterBox>
          <ErrorBox>
            <div>{errorUserId && `*${errorUserId}`}</div>
            <div>{errorPwd && `*${errorPwd}`}</div>
          </ErrorBox>
          <RegisterBox>
            <StyledInput light={light} className={errorNickname && 'errorNickname'}>
              <div>
                <MdPerson />
              </div>
              <input
                autoComplete="nickname"
                name="nickname"
                value={form.nickname}
                onChange={onChange}
                placeholder="이름"
              />
            </StyledInput>

            <StyledInput light={light} className={errorEmail && 'errorEmail'}>
              <div>
                <MdEmail />
              </div>
              <input autoComplete="email" name="email" value={form.email} onChange={onChange} placeholder="이메일" />
            </StyledInput>
          </RegisterBox>
          <ErrorBox>
            <div>{errorNickname && `*${errorNickname}`}</div>
            <div>{errorEmail && `*${errorEmail}`}</div>
          </ErrorBox>

          <ButtonWidthMarginTop>회원가입</ButtonWidthMarginTop>
        </form>
      </AuthFormBlock>
    </>
  );
};

export default Register;
