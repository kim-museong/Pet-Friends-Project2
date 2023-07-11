import { Link } from 'react-router-dom';
import { FindIdBox, FindInputBox, Footer } from '../../lib/styles/find';
import styled from 'styled-components';

const ShowBox = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  border: 1px solid;
  width: 300px;
  height: 300px;
  background-color: white;
  div {
    margin: 40% auto;
  }

  button {
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
  }
`;

const FindId = ({ findId, theme, onChange, findEmail, error, onConfirm, showBox, getUserId, onCancel }) => {
  const { nickname, email, certificationNumber } = findId;
  const { nicknameError, emailError } = error;
  return (
    <>
      <FindIdBox style={{ position: 'relative' }}>
        <div>
          <Link to="/">Logo</Link>
          <h1>아이디 찾기</h1>
        </div>
        <div>
          <FindInputBox>
            <div>
              <div>
                <input
                  className={nicknameError && 'nicknameError'}
                  autoComplete="nickname"
                  name="nickname"
                  onChange={onChange}
                  value={nickname}
                  placeholder="닉네임을 입력해주세요."
                />
                <div>
                  <input
                    className={emailError && 'emailError'}
                    autoComplete="email"
                    name="email"
                    onChange={onChange}
                    value={email}
                    placeholder="이메일을 입력해주세요."
                  />
                  <button onClick={findEmail}>인증번호받기</button>
                </div>
                <div style={{ height: '45px', marginBottom: '20px' }}>
                  <div className="error">{nicknameError && nicknameError}</div>
                  <div className="error">{emailError && emailError}</div>
                </div>
                <div>
                  <input
                    className="certificationNumber"
                    autoComplete="certificationNumber"
                    name="certificationNumber"
                    onChange={onChange}
                    value={certificationNumber}
                    placeholder="인증번호을 입력하세요."
                  />
                </div>
                <button onClick={onConfirm}>확인</button>
              </div>
            </div>
          </FindInputBox>
        </div>
        {showBox && (
          <ShowBox>
            <div>
              <p>아이디</p>
              <p>{getUserId}</p>
              <button onClick={onCancel}>확인</button>
            </div>
          </ShowBox>
        )}
        <Footer theme={String(theme)}>
          <Link to="/auth/login">로그인</Link>
          <Link to="/auth/credentials?type=findPwd">비밀번호 찾기</Link>
        </Footer>
      </FindIdBox>
    </>
  );
};

export default FindId;
