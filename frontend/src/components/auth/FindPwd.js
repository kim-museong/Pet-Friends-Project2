import styled from 'styled-components';
import { MdMailOutline, MdOutlineSmartphone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FindIdBox, Footer, FindInputBox } from '../../lib/styles/find';

const FindMethod = styled.div`
  width: 90%;
  margin: 5% auto;

  .method {
    display: inline-block;
    width: 20%;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    padding: 10px;
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'rgb(50, 50, 50)')};
    font-size: 14px;

    &:hover {
      border: 1px solid rgb(255, 140, 0);
    }
  }

  .nick {
    border: 1px solid ${({ email }) => (email === 'true' ? '' : 'rgb(255, 140, 0)')};
    svg {
      font-size: 50px;
      color: ${({ email }) => (email === 'true' ? '' : 'rgb(255, 140, 0)')};
    }
  }

  .email {
    border: 1px solid ${({ email }) => (email === 'true' ? 'rgb(255, 140, 0)' : '')};

    svg {
      font-size: 50px;
      color: ${({ email }) => (email === 'true' ? 'rgb(255, 140, 0)' : '')};
    }
  }
`;

const ResultBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(50,50,50)' : 'white')};
  border-radius: 5px;
  button {
    width: 60%;
  }

  div:first-child {
    margin-top: 40px;
  }

  div + div {
    margin-top: 10px;
  }

  div + button {
    margin-top: 20px;
  }

  input {
    width: 40%;
  }
`;

const ChangePwdBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(50,50,50)' : 'white')};
  border-radius: 5px;
  button {
    width: 60%;
  }

  div:first-child {
    margin-top: 20px;
  }

  div + div {
    margin-top: 5px;
  }

  div + button {
    margin-top: 10px;
  }

  input {
    width: 60%;
    margin: 5px;
  }
`;

const FindPwd = ({
  form,
  init,
  email,
  theme,
  onChange,
  findPhone,
  findEmail,
  selectPhone,
  selectEmail,
  onCheck,
  onCancel,
  onSubmitPwd,
  onComplete,
}) => {
  const { result, isResult, valid, isConfirm } = init;
  return (
    <>
      <FindIdBox>
        <div>
          <Link to="/">Logo</Link>
          <h1>비밀번호 찾기</h1>
        </div>
        <FindMethod theme={String(theme)} email={String(email)}>
          <div className="method email" onClick={selectEmail}>
            <MdMailOutline />
            <div>이메일</div>
          </div>
          <div className="method nick" onClick={selectPhone}>
            <MdOutlineSmartphone />
            <div>휴대폰</div>
          </div>

          <FindInputBox>
            <div>
              <div>
                <div>{email ? '등록했던 이메일을 입력해주세요.' : '전화번호'}</div>
                <input
                  autoComplete="userId"
                  name="userId"
                  onChange={onChange}
                  value={form.userId}
                  placeholder="아이디를 입력해주세요."
                />
                <input
                  autoComplete="email"
                  name="email"
                  onChange={onChange}
                  value={form.email}
                  placeholder={` ${email ? '이메일' : '전화번호'}을 입력해주세요.`}
                />
                {email ? <button onClick={findEmail}> 확인</button> : <button onClick={findPhone}> 확인</button>}
              </div>
              {isConfirm && (
                <ChangePwdBox theme={String(theme)}>
                  <div>비밀번호 재설정</div>
                  <form onSubmit={onSubmitPwd}>
                    <div>
                      <input
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        placeholder="새로운 비밀번호를 입력해주세요."
                        value={form.password}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                      <input
                        autoComplete="new-password"
                        type="password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        value={form.passwordConfirm}
                        onChange={onChange}
                      />
                    </div>
                    <button>변경</button>
                  </form>
                </ChangePwdBox>
              )}
              {isResult && (
                <ResultBox theme={String(theme)}>
                  <div>
                    <div>{valid ? (isConfirm ? '성공' : '오류!') : '인증번호가 전송되었습니다.'}</div>

                    <div>
                      {valid ? (
                        <div>{result}</div>
                      ) : (
                        <>
                          <input
                            placeholder="인증번호를 입력해주세요."
                            name="validConfirm"
                            value={form.validConfirm}
                            onChange={onChange}
                          />
                        </>
                      )}
                    </div>
                    {valid ? (
                      isConfirm ? (
                        <button onClick={onComplete}>확인</button>
                      ) : (
                        <button onClick={onCancel}>확인</button>
                      )
                    ) : (
                      <button onClick={onCheck}>인증번호 확인</button>
                    )}
                  </div>
                </ResultBox>
              )}
            </div>
          </FindInputBox>
        </FindMethod>
        <Footer theme={String(theme)}>
          <Link to="/auth/login">로그인</Link>
          <Link to="/findID">아이디 찾기</Link>
        </Footer>
      </FindIdBox>
    </>
  );
};

export default FindPwd;
