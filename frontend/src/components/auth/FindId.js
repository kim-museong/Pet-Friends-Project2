import { Link } from 'react-router-dom';
import { FindIdBox, FindInputBox, Footer } from '../../lib/styles/find';
import styled from 'styled-components';
import { MdInfo } from 'react-icons/md';
import { useState } from 'react';
import palette from '../../lib/styles/palette';

const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
`;

const ShowBox = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid rgb(186, 186, 186);

  .title {
    margin: 30px auto;
    font-size: 20px;
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
  width: 340px;
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
    left: 30px;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
    border-radius: 0 2px;
    box-shadow: -1px 1px rgb(150, 150, 150);
    transform: rotate(315deg);
    z-index: 2;
  }
`;

const FindId = ({
  findId,
  theme,
  onChange,
  findEmail,
  error,
  onConfirm,
  showBox,
  getUserId,
  onCancel,
  timerExpired,
  timer,
  formatTime,
  timeOut,
  confirmFail,
}) => {
  const { nickname, email, certificationNumber } = findId;
  const { nicknameError, emailError } = error;
  const [isInfoHovered, setIsInfoHovered] = useState(false);

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
          <h1>아이디 찾기</h1>
        </div>

        {showBox ? (
          <FindInputBox>
            <ShowBox>
              <div className="title">아이디</div>
              <ShowBox>{getUserId}</ShowBox>
              <button onClick={onCancel}>확인</button>
            </ShowBox>
          </FindInputBox>
        ) : (
          <div>
            <FindInputBox>
              <div>
                <p style={{ fontSize: '12px', color: 'rgb(160,160,160)' }}>
                  * 본인확인 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을 수 있습니다.
                </p>
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
                    {timerExpired ? (
                      <button className="certificationBtn" onClick={findEmail}>
                        다시받기
                      </button>
                    ) : (
                      <button className="certificationBtn" onClick={findEmail}>
                        인증번호받기
                      </button>
                    )}
                  </div>
                  <StatusBox>
                    <div className="error">{nicknameError && nicknameError}</div>
                    <div className="error">{emailError && emailError}</div>
                  </StatusBox>

                  <InfoBox>
                    인증번호가 오지 않나요?
                    <MdInfo onMouseEnter={onInfoHover} onMouseLeave={onInfoLeave} />
                    <ExplanationBox theme={String(theme)} ishovered={String(isInfoHovered)}>
                      <div className="triangle"></div>
                      <div>
                        인증번호가 오지 않는 이유는 닉네임과 이메일이 일치하지 않거나 회원가입 시 입력한 이메일과 다를
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
              </div>
            </FindInputBox>
          </div>
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
