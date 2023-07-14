import styled from 'styled-components';
import { FindInputBox } from '../../lib/styles/find';
import { useState } from 'react';
import palette from '../../lib/styles/palette';
import { MdInfo, MdAlarm } from 'react-icons/md';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
  text-align: left;
  margin: 5px auto 30px;
`;

const FindPwdInputBox = styled(FindInputBox)`
  text-align: center;
`;

const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 63.6px;
  margin-top: 10px;
  margin-left: 5px;
  padding: 20px 20px;
  border: 1px solid rgb(186, 186, 186);
  font-size: 20px;

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

  svg {
    font-size: 25px;
    margin-top: 5px;
    margin-right: 5px;
  }
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
  font-size: 16px;
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
  top: -70px;
  left: 178px;
  display: flex;
  flex-direction: column;
  width: 450px;
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
    top: 57px;
    left: 88px;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
    border-radius: 0 2px;
    box-shadow: -1px 1px rgb(150, 150, 150);
    transform: rotate(315deg);
    z-index: 2;
  }
`;

const FindPwdSecond = ({
  onChange,
  onConfirm,
  user,
  error,
  findPwd,
  timerExpired,
  findEmail,
  theme,
  timeOut,
  confirmFail,
  timer,
  formatTime,
  sendSuccess,
}) => {
  const { emailError, nicknameError } = error;
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
      <FindPwdInputBox>
        <div>
          <div style={{ margin: '50px 0 ' }}>{maskedEmail && maskedEmail} 인증번호 보내기</div>
          <p style={{ fontSize: '16px', color: 'rgb(160,160,160)' }}>
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
              <div className="success">{sendSuccess && sendSuccess}</div>
            </StatusBox>
            <InfoBox>
              아직도 인증번호을 받지 못하셨나요?
              <MdInfo onMouseEnter={onInfoHover} onMouseLeave={onInfoLeave} />
              <ExplanationBox theme={String(theme)} ishovered={String(isInfoHovered)}>
                <div className="triangle"></div>
                <div>
                  인증번호를 받지 못하는 이유는 닉네임과 이메일이 일치하지 않거나 회원가입 시 입력한 이메일과 다를 수
                  있습니다.
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
                <div>
                  <MdAlarm />
                </div>
                <div>{formatTime(timer)}</div>
              </TimeBox>
            </CertificationBox>
            <button onClick={onConfirm}>확인</button>
            <StatusBox>
              <div className="error">{timeOut && '인증: 인증시간이 초과되었습니다. 다시 시도해주세요.'}</div>
              <div className="error">{confirmFail && confirmFail}</div>
            </StatusBox>
          </div>
        </div>
      </FindPwdInputBox>
    </>
  );
};

export default FindPwdSecond;
