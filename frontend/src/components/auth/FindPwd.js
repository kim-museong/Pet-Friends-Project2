import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FindIdBox, Footer, FindInputBox } from '../../lib/styles/find';
import palette from '../../lib/styles/palette';
import { useCallback, useState } from 'react';
import { MdInfo } from 'react-icons/md';

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

const TimeBox = styled.div`
  border: 1px solid rgb(186, 186, 186);
  margin-left: 5px;
  width: 30%;
  padding: 12px 20px;
  font-size: 18px;

  color: ${({ timer, timerexpired }) => {
    if (timerexpired === 'true') {
      switch (true) {
        case timer > 120:
          return 'green';
        case timer > 60:
          return 'orange';
        case timer > 30:
          return 'red';
        default:
          return 'red';
      }
    } else {
      return 'rgb(186,186,186)';
    }
  }};

  border-color: ${({ timer, timerexpired }) => {
    if (timerexpired === 'true') {
      switch (true) {
        case timer > 120:
          return 'green';
        case timer > 60:
          return 'orange';
        case timer > 30:
          return 'red';
        default:
          return 'red';
      }
    } else {
      return 'rgb(186,186,186)';
    }
  }};
`;

const CertificationBox = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;

const InfoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  font-size: 12px;
  color: rgb(140 140, 140);

  svg {
    font-size: 16px;
    margin-left: 3px;
    margin-top: 1px;
  }

  svg:hover {
    color: ${palette.mainColor};
  }
`;

const ExplanationBox = styled.div`
  position: absolute;
  top: -65px;
  left: 97px;
  display: flex;
  flex-direction: column;
  width: 350px;
  box-shadow: 0px 0px 2px black;
  padding: 10px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  text-align: left;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${({ ishovered }) => ishovered === 'true' && `opacity: 1;`}

  .triangle {
    position: absolute;
    top: 49px;
    left: 885px;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
    border-radius: 0 2px;
    box-shadow: -1px 1px rgb(150, 150, 150);
    transform: rotate(315deg);
    z-index: 2;
  }
`;

const FindPwd = ({
  findPwd,

  theme,
  onChange,
  findEmail,
  onSubmitPwd,
  error,
  nextQ,
  firstQ,
  user,
  timerExpired,
  timeOut,
  confirmFail,
  timer,
  formatTime,
  onConfirm,
}) => {
  const { userIdError, emailError, notUserError, nicknameError } = error;
  const { email } = user || {};
  const atIndex = email ? email.indexOf('@') : -1; // email이 존재하지 않는 경우 -1로 설정
  const maskedEmail = atIndex !== -1 ? email.substring(0, atIndex - 4) + '****' + email.substring(atIndex) : '';
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const { certificationNumber } = findPwd;

  const onInfoHover = () => {
    setIsInfoHovered(true);
  };

  const onInfoLeave = () => {
    setIsInfoHovered(false);
  };

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
              <div style={{ marginBottom: '50px' }}>{maskedEmail && maskedEmail} 인증번호 보내기</div>
              <p style={{ fontSize: '12px', color: 'rgb(160,160,160)' }}>
                * 본인확인 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을 수 있습니다.
              </p>
              <div>
                <input
                  autoComplete="nickname"
                  name="nickname"
                  onChange={onChange}
                  value={findPwd.nickname}
                  placeholder="이름을 입력해주세요."
                />
                <input
                  autoComplete="email"
                  name="email"
                  onChange={onChange}
                  value={findPwd.email}
                  placeholder="이메일을 입력해주세요."
                />

                {timerExpired ? (
                  <button className="certificationBtn" onClick={findEmail}>
                    다시받기
                  </button>
                ) : (
                  <button className="certificationBtn" onClick={findEmail}>
                    인증번호받기
                  </button>
                )}
                <StatusBox>
                  <div className="error">{nicknameError && nicknameError}</div>
                  <div className="error">{emailError && emailError}</div>
                </StatusBox>
                <InfoBox>
                  아직도 인증번호을 받지 못하셨나요?
                  <MdInfo onMouseEnter={onInfoHover} onMouseLeave={onInfoLeave} />
                  <ExplanationBox theme={String(theme)} ishovered={String(isInfoHovered)}>
                    <div className="triangle"></div>
                    <div>
                      인증번호를 받지 못하는 이유는 닉네임과 이메일이 일치하지 않거나 회원가입 시 입력한 이메일과 다를
                      수 있습니다.
                    </div>
                  </ExplanationBox>
                </InfoBox>

                <CertificationBox>
                  <input
                    className={`certificationNumber ${timeOut || confirmFail ? 'certificationError' : ''}`}
                    autoComplete="certificationNumber"
                    name="certificationNumber"
                    onChange={onChange}
                    value={certificationNumber}
                    placeholder="인증번호을 입력하세요."
                  />
                  <TimeBox timer={String(timer)} timerexpired={String(timerExpired)}>
                    {formatTime(timer)}
                  </TimeBox>
                </CertificationBox>
                <button onClick={onConfirm}>확인</button>
                <StatusBox>
                  <div className="error">{timeOut && '인증: 인증시간이 초과. 다시 시도해주세요.'}</div>
                  <div className="error">{confirmFail && confirmFail}</div>
                </StatusBox>
              </div>

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
