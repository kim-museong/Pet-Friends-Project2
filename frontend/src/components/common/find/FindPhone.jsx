import { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { MdInfo, MdAlarm } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { changeError, changeInput, checkEmail, checkPhone, nextStep } from '../../../modules/find';
import { FindInputBox } from '../../../lib/styles/find';
import { formatTime } from '../../../lib/main/time';

const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
  text-align: left;
  margin: 5px auto 30px;
`;

const FindPwdInputBox = styled(FindInputBox)`
  text-align: center;
  width: 100%;
  margin: 50px auto 0;

  .selectBox {
    width: 40%;
    padding: 20px 10px;
  }

  .right {
    padding-left: 100px;
  }

  .left {
    padding-right: 100px;
  }
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
  box-shadow: 0px 0px 1px black;
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

const FindPhone = () => {
  // --------- state -----------------
  const [timer, setTimer] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [confirmFail, setConfirmFailure] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [sendSuccess, setSnedSuccess] = useState('');
  const [errorKeyMap, setErrorKeyMap] = useState({
    phone: 'phoneError',
  });
  const [messages, setMessages] = useState({
    phoneError: '・ 번호: 번호을 입력해주세요.',
    phoneRegexError: '・ 번호: 번호형식에 맞게 입력해주세요.',
    certificationError: '・ 인증: 인증번호를 입력해주세요.',
    different: '・ 인증: 인증번호가 없거나 틀립니다.',
    sendSuccess: '・ 전송: 이메일이 성공적으로 전송되었습니다.',
  });
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  // -------------- 리덕스 --------------------

  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { findPwd, error, user, find } = useSelector(({ find }) => ({
    findPwd: find.findPwd,
    error: find.findPwd.error,
    user: find.findPwd.findUser,
    find: find,
  }));

  // -----------------

  const { phone } = user || '';
  const { phoneError } = error || '';

  // ------------- 정보보이기 -----------

  const onInfoHover = () => {
    setIsInfoHovered(true);
  };

  const onInfoLeave = () => {
    setIsInfoHovered(false);
  };

  // ---------- 번호 부분 *로 만드는 함수 ------------

  const maskNumber = (number) => {
    if (typeof number === 'number') {
      number = number.toString(); // 숫자를 문자열로 변환
    }

    if (number.length !== 11) {
      // 입력된 숫자의 길이가 11자리가 아닌 경우 그대로 반환
      return number;
    }

    const maskedNumber = number
      .split('')
      .map((digit, index) => {
        if (index === 1 || index === 2 || index === 4 || index === 5 || index === 7 || index === 8) {
          return '*';
        }
        return digit;
      })
      .join('');

    return maskedNumber;
  };

  // ---------- 유효성 검사 ------------------------

  const validation = useCallback(
    async (name, value) => {
      if (name === 'phone') {
        const phoneRegex = /^[0-9]+$/;
        if (value === '') {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: messages.phoneError }));
          return;
        } else if (!phoneRegex.test(value)) {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: messages.phoneRegexError }));
        } else {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: null }));
        }
      }
    },
    [dispatch, errorKeyMap, messages.phoneError, messages.phoneRegexError],
  );

  // ----------- 타이머 함수 --------------

  const timeStart = useCallback(() => {
    setTimerExpired(true);
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          setTimeOut(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    setIntervalId(id);
  }, []);

  // ----------- 인풋값 변경 --------------

  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      dispatch(
        changeInput({
          form: 'findPwd',
          key: name,
          value,
        }),
      );
      validation(name, value);
    },
    [dispatch, validation],
  );

  //------------- 이메일 전송 함수 ---------------------

  const sendPhone = async (e) => {
    e.preventDefault();
    const { phone } = findPwd;
    validation('phone', phone);
    if (phone) {
      try {
        clearInterval(intervalId);
        setTimerExpired(false);
        setTimer(180);
        setTimeOut(false);
        setSnedSuccess(messages.sendSuccess);
        dispatch(checkPhone(phone));
        setTimerExpired(true);
        timeStart();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onConfirm = () => {
    const { certification } = findPwd;
    const { certificationNumber } = find;
    if (certification === '') {
      setConfirmFailure(messages.certificationError);
      return;
    } else if (certification !== certificationNumber) {
      console.log('실패');
      setConfirmFailure(messages.different);
      return;
    } else {
      setConfirmFailure(null);
      dispatch(nextStep());
      console.log('성공');
    }
  };

  return (
    <>
      <FindPwdInputBox>
        <div> {phone && maskNumber(phone)} </div>
        <p style={{ fontSize: '14px', color: 'rgb(160,160,160)' }}>
          ・ 본인확인 번호와 입력한 번호 주소가 같아야, 인증번호를 받을 수 있습니다.
        </p>
        <div>
          <input
            type="tel"
            autoComplete="phone"
            name="phone"
            onChange={onChange}
            value={findPwd.phone}
            placeholder="번호을 입력해주세요."
            className={phoneError ? 'phoneError' : ''}
          />

          <button onClick={sendPhone}>{timerExpired ? '다시받기' : '인증번호받기'}</button>

          <StatusBox>
            <div className="error">{phoneError && phoneError}</div>
            <div className="success">{sendSuccess && sendSuccess}</div>
          </StatusBox>
          <InfoBox>
            아직도 인증번호을 받지 못하셨나요?
            <MdInfo onMouseEnter={onInfoHover} onMouseLeave={onInfoLeave} />
            <ExplanationBox theme={String(theme)} ishovered={String(isInfoHovered)}>
              <div className="triangle"></div>
              <div>
                인증번호를 받지 못하는 이유는 닉네임과 번호가 일치하지 않거나 회원가입 시 입력한 번호와 다를 수
                있습니다.
              </div>
            </ExplanationBox>
          </InfoBox>

          <CertificationBox>
            <input
              className={`certification ${timeOut || confirmFail ? 'certificationError' : ''}`}
              autoComplete="certification"
              name="certification"
              onChange={onChange}
              value={findPwd.certification}
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
      </FindPwdInputBox>
    </>
  );
};

export default FindPhone;
