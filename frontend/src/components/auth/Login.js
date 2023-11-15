import { MdPerson, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { ShowPwdBox } from '../../lib/styles/auth';
import { Footer } from '../../lib/styles/find';
import { Link } from 'react-router-dom';
import * as S from '../../styles/login.style';

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
      <S.AuthFormBlock theme={String(theme)}>
        <S.LogoBtnBox>
          <S.LogoBtn to="/" />
        </S.LogoBtnBox>

        <S.LoginBox>
          <form onSubmit={onSubmit}>
            <S.InputStyle theme={String(theme)}>
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
              />
            </S.InputStyle>

            <S.InputStyle theme={String(theme)}>
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
            </S.InputStyle>

            <S.SaveUserIdBox theme={String(theme)}>
              <input ref={checkBoxRef} type="checkbox" checked={isChecked} onChange={onSaveUserId} />
              <div onClick={checkBoxSelect}>아이디 저장</div>
            </S.SaveUserIdBox>

            <S.ErrorBox>{error && error}</S.ErrorBox>

            <S.ButtonWidthMarginTop>로그인</S.ButtonWidthMarginTop>
          </form>
        </S.LoginBox>
      </S.AuthFormBlock>
      <Footer theme={String(theme)}>
        <Link to="/auth/credentials?type=findId">아이디찾기</Link>
        <Link to="/auth/credentials?type=findPwd">비밀번호 찾기</Link>
        <Link to="/auth/register">회원가입</Link>
      </Footer>
      <S.LoginBox></S.LoginBox>
    </>
  );
};

export default Login;
