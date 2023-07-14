import FindPwdSecond from '../../components/find/FindPwdSecond';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeError, changeInput, checkEmail, nextStep } from '../../modules/find';

const FindPwdSecondContainer = () => {
  const [certificationNum, setCertificationNum] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [confirmFail, setConfirmFailure] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isValidation, setIsValidation] = useState('');
  const [sendSuccess, setSnedSuccess] = useState('');
  const [errorKeyMap, setErrorKeyMap] = useState({
    email: 'emailError',
    nickname: 'nicknameError',
  });
  const [messages, setMessages] = useState({
    nicknameError: '・ 이름: 이름을 입력해주세요.',
    emailError: '・ 이메일: 이메일을 입력해주세요.',
    confirmFail: '・ 인증: 인증번호를 입력해주세요.',
    different: '・ 인증: 인증번호가 틀립니다.',
    sendSuccess: '・ 전송: 이메일이 성공적으로 전송되었습니다.',
  });

  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { findPwd, isemail, error, user } = useSelector(({ find }) => ({
    findPwd: find.findPwd,
    isemail: find.isemail,
    error: find.findPwd.error,
    user: find.findPwd.findUser,
  }));

  const validation = useCallback(
    async (name, value) => {
      if (name === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value === '') {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: messages.emailError }));
          return;
        } else if (!emailRegex.test(value)) {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: '이메일 형식이 오류' }));
          return;
        } else {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: null }));
        }
      } else if (name === 'nickname') {
        if (value === '') {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: messages.nicknameError }));
        } else {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: null }));
        }
      }
    },
    [dispatch, errorKeyMap, messages.emailError, messages.nicknameError],
  );

  // ---------- 초를 분:초로 바꾸기 -----------------

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

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

  const findEmail = async () => {
    const { email, nickname } = findPwd;
    validation('email', email);
    validation('nickname', nickname);
    console.log(email, nickname);
    if (email && nickname) {
      try {
        clearInterval(intervalId);
        setTimerExpired(false);
        setTimer(180);
        setTimeOut(false);
        setSnedSuccess(messages.sendSuccess);
        dispatch(checkEmail({ email, nickname }));
        setTimerExpired(true);
        timeStart();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onConfirm = () => {
    const { certificationNumber } = findPwd;
    if (certificationNumber === '') {
      setConfirmFailure(messages.confirmFail);
      return;
    } else if (certificationNumber !== isemail) {
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
      <FindPwdSecond
        onChange={onChange}
        onConfirm={onConfirm}
        error={error}
        user={user}
        findPwd={findPwd}
        timerExpired={timerExpired}
        findEmail={findEmail}
        theme={theme}
        timeOut={timeOut}
        confirmFail={confirmFail}
        timer={timer}
        formatTime={formatTime}
        sendSuccess={sendSuccess}
      />
    </>
  );
};

export default FindPwdSecondContainer;
