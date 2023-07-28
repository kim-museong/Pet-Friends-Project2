import { Link } from 'react-router-dom';
import { FindIdBox, FindInputBox, Footer } from '../../lib/styles/find';
import styled, { css } from 'styled-components';
import { MdInfo, MdAlarm } from 'react-icons/md';
import { useState } from 'react';
import palette from '../../lib/styles/palette';

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
  box-shadow: 0px 0px 2px 1px ${palette.border};
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
    box-shadow: -1px 1px ${palette.border};
    transform: rotate(315deg);
    z-index: 2;
  }
`;

const ShowBox = styled.div`
  background: white;
  width: 550px;
  height: 500px;
  top: 25%;
  left: 35%;
  position: absolute;
  padding: 20px;
  margin: 20px;
  border: 1px solid ${palette.border};

  .title {
    margin: 80px auto;
    font-size: 20px;
  }

  div {
    margin-bottom: 40px;
  }
`;

const LogoBox = styled.div`
  .logo {
    background-image: url('../../../images/petFriendsLogo.png');
    display: inline-block;
    width: 200px;
    height: 100px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 150%;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;

  input {
    width: 30px;
    margin: 20px 0;
    display: none;
  }

  label {
    padding-bottom: 5px;
    cursor: pointer;
    &:hover {
      color: ${palette.mainColor};
    }
  }
`;

const activeButtonStyles = css`
  color: ${palette.mainColor};
  border-bottom: 2px solid ${palette.mainColor};
`;

const RadioBox = styled.div`
  width: 60px;
  border-radius: 0;
  padding-bottom: 3px;
  ${({ active }) => active && activeButtonStyles}
  margin: 0 20px;
`;

const FindId = ({
  findId,
  form,
  theme,
  onChange,
  error,
  errors,
  onConfirm,
  showBox,
  getUserId,
  onCancel,
  masked,
  confirmFail,
  findType,
  changeRadio,
  sendPhone,
  timerExpired,
  timeOut,
  timer,
  formatTime,
  sendSuccess,
  onfindPhone,
}) => {
  const { nickname } = findId;
  const { nicknameError } = error;
  const { userId } = getUserId || '';
  const { errorPhone, errorConfirm } = errors || '';

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
        <LogoBox style={{ marginTop: '10%' }}>
          <Link to="/" className="logo"></Link>
          <h1>아이디 찾기</h1>
        </LogoBox>
        <FlexBox>
          <RadioBox active={findType === 'nickname'}>
            <input
              id="nickname"
              type="radio"
              name="findId"
              value="nickname"
              checked={findType === 'nickname'}
              onChange={changeRadio}
            />
            <label htmlFor="nickname">닉네임</label>
          </RadioBox>
          <RadioBox active={findType === 'phone'}>
            <input
              id="phone"
              type="radio"
              name="findId"
              value="phone"
              checked={findType === 'phone'}
              onChange={changeRadio}
            />
            <label htmlFor="phone">폰번호</label>
          </RadioBox>
        </FlexBox>

        {findType === 'nickname' && (
          <div>
            <FindInputBox theme={String(theme)}>
              <div>
                <p style={{ color: 'rgb(160,160,160)', fontSize: '14px' }}>
                  ・ 회원가입 시 입력한 이름와 입력한 이름이 같아야 합니다.
                </p>
                <div>
                  <input
                    className={nicknameError && 'nicknameError'}
                    autoComplete="nickname"
                    name="nickname"
                    onChange={onChange}
                    value={nickname}
                    placeholder="이름을 입력해주세요."
                  />
                  <button className="confirm" onClick={onConfirm}>
                    확인
                  </button>

                  <StatusBox>
                    <div className="error">{nicknameError && nicknameError}</div>
                    <div className="error">{confirmFail && confirmFail}</div>
                  </StatusBox>
                </div>
              </div>
            </FindInputBox>
          </div>
        )}
        {findType === 'phone' && (
          <>
            <FindIdBox>
              <FindInputBox theme={String(theme)}>
                <input
                  type="tel"
                  autoComplete="phone"
                  name="phone"
                  value={findId.phone}
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
                      인증번호를 받지 못하는 이유는 닉네임과 이메일이 일치하지 않거나 회원가입 시 입력한 이메일과 다를
                      수 있습니다.
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
                <button onClick={onfindPhone}>확인</button>
                <StatusBox>
                  <div className="error">{timeOut && '인증: 인증시간이 초과되었습니다. 다시 시도해주세요.'}</div>
                  <div className="error"> {errorConfirm && errorConfirm}</div>
                </StatusBox>
              </FindInputBox>
            </FindIdBox>
          </>
        )}
        {showBox && (
          <FindInputBox>
            <ShowBox>
              <div className="title">아이디</div>
              <div>{masked(userId)}</div>
              <button onClick={onCancel}>확인</button>
            </ShowBox>
          </FindInputBox>
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
