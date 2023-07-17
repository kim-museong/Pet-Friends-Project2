import styled from 'styled-components';
import { FindIdBox, FindInputBox } from '../../../lib/styles/find';
import { useState } from 'react';
import { MdInfo, MdAlarm } from 'react-icons/md';
import palette from '../../../lib/styles/palette';

const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
  text-align: left;
  margin: 5px auto 30px;
`;

const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 51px;
  margin-top: 10px;
  margin-left: 5px;
  padding: 20px 20px;
  border: 1px solid ${palette.border};
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
      return `${palette.border}`;
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
      return `${palette.border}`;
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
  top: -67px;
  left: 180px;
  width: 364px;
  box-shadow: 0px 0px 2px black;
  padding: 10px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  font-size: 14px;
  text-align: left;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${({ ishovered }) => ishovered === 'true' && `opacity: 1;`}

  .triangle {
    position: absolute;
    top: 55px;
    left: 64.5px;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
    border-radius: 0 2px;
    box-shadow: -1px 1px rgb(150, 150, 150);
    transform: rotate(315deg);
    z-index: 2;
  }
`;

const Registerfirst = ({
  theme,
  form,
  error,
  onChange,
  sendPhone,
  timerExpired,
  timeOut,
  timer,
  formatTime,
  onConfirm,
  sendSuccess,
}) => {
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const { errorPhone, errorConfirm } = error;

  const onInfoHover = () => {
    setIsInfoHovered(true);
  };

  const onInfoLeave = () => {
    setIsInfoHovered(false);
  };

  return (
    <FindIdBox>
      <div>
        <h3>가입을 위해 휴대폰 인증을 진행해주세요.</h3>
      </div>
      <FindInputBox theme={String(theme)}>
        <input
          type="tel"
          autoComplete="phone"
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="번호를 입력해주세요. "
          autoFocus
        />

        <button className="certificationBtn" onClick={sendPhone}>
          {timerExpired ? '다시받기' : '인증번호받기'}
        </button>

        <StatusBox>
          <div className="error">{errorPhone && errorPhone}</div>
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
            className={`certificationNumber ${timeOut ? 'certificationError' : ''}`}
            autoComplete="certification"
            name="certification"
            onChange={onChange}
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
          <div className="error"> {errorConfirm && errorConfirm}</div>
        </StatusBox>
      </FindInputBox>
    </FindIdBox>
  );
};

export default Registerfirst;
