import { MdPerson, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
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
      <S.LoginWrapper theme={String(theme)}>
        <div>
          <S.LogoBtn to="/" />
        </div>

        <div>
          <form onSubmit={onSubmit}>
            <S.LoginInputBox theme={String(theme)}>
              <MdPerson onClick={() => iconClick('username')} />
              <S.LoginInput
                autoFocus
                ref={inputRefs.username}
                autoComplete="username"
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="아이디"
                maxLength={20}
              />
            </S.LoginInputBox>

            <S.LoginInputBox theme={String(theme)}>
              <MdLock onClick={() => iconClick('password')} />
              <S.LoginInput
                ref={inputRefs.password}
                autoComplete="new-password"
                name="password"
                value={form.password}
                onChange={onChange}
                type={showPwd ? 'text' : 'password'}
                placeholder="비밀번호"
              />
              {showPwd ? <MdVisibility onClick={onShowPwd} /> : <MdVisibilityOff onClick={onShowPwd} />}
            </S.LoginInputBox>

            <S.SaveUserIdBox theme={String(theme)}>
              <input ref={checkBoxRef} type="checkbox" checked={isChecked} onChange={onSaveUserId} />
              <div onClick={checkBoxSelect}>아이디 저장</div>
            </S.SaveUserIdBox>

            <S.ErrorBox>{error && error}</S.ErrorBox>

            <S.LoginButton>로그인</S.LoginButton>
          </form>
        </div>

        <Footer theme={String(theme)}>
          <Link to="/auth/credentials?type=findId">아이디찾기</Link>
          <Link to="/auth/credentials?type=findPwd">비밀번호 찾기</Link>
          <Link to="/auth/register">회원가입</Link>
        </Footer>
      </S.LoginWrapper>
    </>
  );
};

export default Login;
