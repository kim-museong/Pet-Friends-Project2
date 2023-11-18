import { MdPerson, MdLock, MdVisibility, MdVisibilityOff, MdEmail, MdPhoneAndroid } from 'react-icons/md';
import { useState } from 'react';
import { ShowPwdBox } from '../../../lib/styles/auth';
import * as S from '../../../styles/register/register.style';

const Register = ({ form, onChange, onSubmit, error, theme, iconClick, inputRefs, focusOut }) => {
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
      <S.RegisterWrapper>
        <form onSubmit={onSubmit}>
          <S.RegisterBox>
            <S.RegisterInputBox theme={String(theme)} className={errorUserId && 'errorUserId'}>
              <div className="icon" onClick={() => iconClick('username')}>
                <MdPerson />
              </div>
              <S.RegisterInput
                autoFocus
                ref={inputRefs.username}
                autoComplete="username"
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="아이디"
                onBlur={focusOut}
                maxLength={12}
              />
            </S.RegisterInputBox>

            <S.RegisterInputBox theme={String(theme)} className={errorPwd && 'errorPwd'}>
              <div className="icon" onClick={() => iconClick('password')}>
                <MdLock />
              </div>
              <S.RegisterInput
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
            </S.RegisterInputBox>

            <S.RegisterInputBox theme={String(theme)} className={errorPwdCf && 'errorPwdCf'}>
              <div className="icon" onClick={() => iconClick('passwordConfirm')}>
                <MdLock />
              </div>
              <S.RegisterInput
                ref={inputRefs.passwordConfirm}
                autoComplete="new-password"
                name="passwordConfirm"
                value={form.passwordConfirm}
                onChange={onChange}
                type={showPwdCf ? 'text' : 'password'}
                placeholder="비밀번호확인"
              />
              <ShowPwdBox onClick={onShowPwdCf}>{showPwdCf ? <MdVisibility /> : <MdVisibilityOff />}</ShowPwdBox>
            </S.RegisterInputBox>

            <S.ErrorBox>
              <div>{errorUserId && `${errorUserId}`}</div>
              <div>{errorPwd && `${errorPwd}`}</div>
            </S.ErrorBox>
          </S.RegisterBox>

          <S.RegisterBox>
            <S.RegisterInputBox theme={String(theme)} className={errorNickname && 'errorNickname'}>
              <div className="icon" onClick={() => iconClick('nickname')}>
                <MdPerson />
              </div>
              <S.RegisterInput
                ref={inputRefs.nickname}
                autoComplete="nickname"
                name="nickname"
                value={form.nickname}
                onChange={onChange}
                placeholder="이름"
                onBlur={focusOut}
              />
            </S.RegisterInputBox>

            <S.RegisterInputBox theme={String(theme)} className={errorEmail && 'errorEmail'}>
              <div className="icon" onClick={() => iconClick('email')}>
                <MdEmail />
              </div>
              <S.RegisterInput
                ref={inputRefs.email}
                autoComplete="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="[선택] 이메일"
                onBlur={focusOut}
              />
            </S.RegisterInputBox>

            <S.RegisterInputBox theme={String(theme)}>
              <div className="icon">
                <MdPhoneAndroid />
              </div>
              <S.RegisterInput placeholder={form.phone} disabled />
            </S.RegisterInputBox>

            <S.ErrorBox>
              <div>{errorNickname && `${errorNickname}`}</div>
              <div>{errorEmail && `${errorEmail}`}</div>
            </S.ErrorBox>
          </S.RegisterBox>

          <S.ButtonWidthMarginTop>회원가입</S.ButtonWidthMarginTop>
        </form>
      </S.RegisterWrapper>
    </>
  );
};

export default Register;
