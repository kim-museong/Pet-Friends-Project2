import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FindIdBox, Footer, FindInputBox } from '../../lib/styles/find';
import palette from '../../lib/styles/palette';
import { useCallback, useState } from 'react';

const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
  text-align: left;
  margin: 10px auto;
`;

const FindPwdInputBox = styled(FindInputBox)`
  button {
    margin-top: 10px;
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
  findPwd,
  init,
  theme,
  onChange,
  findPhone,
  findEmail,
  onCheck,
  onCancel,
  onSubmitPwd,
  error,
  nextQ,
  firstQ,
  user,
}) => {
  const { result, isResult, valid, isConfirm } = init;
  const { userIdError, emailError, notUserError } = error;
  const { email } = user;
  const atIndex = email.indexOf('@');
  const maskedEmail = email.substring(0, atIndex - 4) + '****' + email.substring(atIndex);
  return (
    <>
      <FindIdBox>
        <div>
          <Link to="/">Logo</Link>
          <h1>비밀번호 찾기</h1>
        </div>
        {firstQ ? (
          <FindPwdInputBox>
            <input
              autoComplete="userId"
              name="userId"
              onChange={onChange}
              value={findPwd.userId}
              placeholder="아이디를 입력해주세요."
            />
            <button onClick={nextQ}> 확인</button>
            <StatusBox>
              <div className="error">{userIdError && userIdError}</div>
              <div className="error">{notUserError && notUserError}</div>
            </StatusBox>
          </FindPwdInputBox>
        ) : (
          <FindPwdInputBox>
            <div>
              <div>{maskedEmail && maskedEmail}</div>
              <div>
                <input
                  autoComplete="email"
                  name="email"
                  onChange={onChange}
                  value={findPwd.email}
                  placeholder="이메일을 입력해주세요."
                />
                <button onClick={findEmail}> 확인</button>
              </div>
              {isConfirm && (
                <ChangePwdBox theme={String(theme)}>
                  <div>비밀번호 재설정</div>
                  <findPwd onSubmit={onSubmitPwd}>
                    <div>
                      <input
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        placeholder="새로운 비밀번호를 입력해주세요."
                        value={findPwd.password}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                      <input
                        autoComplete="new-password"
                        type="password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        value={findPwd.passwordConfirm}
                        onChange={onChange}
                      />
                    </div>
                    <button>변경</button>
                  </findPwd>
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
                            value={findPwd.validConfirm}
                            onChange={onChange}
                          />
                        </>
                      )}
                    </div>
                    {valid ? (
                      isConfirm ? (
                        <button>확인</button>
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
          </FindPwdInputBox>
        )}

        <Footer theme={String(theme)}>
          <Link to="/auth/login">로그인</Link>
          <Link to="/auth/credentials?type=findId">아이디 찾기</Link>
        </Footer>
      </FindIdBox>
    </>
  );
};

export default FindPwd;
