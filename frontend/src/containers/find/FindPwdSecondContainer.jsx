import FindPwdSecond from '../../components/find/FindPwdSecond';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeError, changeInput, checkEmail } from '../../modules/find';

const FindPwdSecondContainer = () => {
  const [certificationNum, setCertificationNum] = useState('');
  const [timer, setTimer] = useState(180); // 3분
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [confirmFail, setConfirmFailure] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isValidation, setIsValidation] = useState('');
  const [errorKeyMap, setErrorKeyMap] = useState({
    email: 'emailError',
    nickname: 'nicknameError',
  });

  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { findPwd, isemail, error } = useSelector(({ find }) => ({
    findPwd: find.findPwd,
    isemail: find.isemail,

    error: find.findPwd.error,
  }));

  const errorMessages = {
    nicknameError: '* 이름: 이름을 입력해주세요.',
    emailError: '* 이메일: 이메일을 입력해주세요.',
    confirmFail: '* 인증: 인증번호를 입력해주세요.',
    different: '* 인증: 인증번호가 틀립니다.',
  };

  const validation = useCallback(
    async (name, value) => {
      if (name === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value === '') {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: errorMessages.emailError }));
          return;
        } else if (!emailRegex.test(value)) {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: '이메일 형식이 오류' }));
          return;
        } else {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: null }));
        }
      } else if (name === 'nickname') {
        if (value === '') {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: errorMessages.nicknameError }));
        } else {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: null }));
        }
      }
    },
    [dispatch, errorKeyMap, errorMessages.emailError, errorMessages.nicknameError],
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

  const timeStart = () => {
    setTimerExpired(true);
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          setTimeOut(true);
          return;
        }
        return prevTimer - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

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
    console.log(nickname);
    const { nicknameError, emailError } = error;
    if (nicknameError && emailError) {
      return;
    }
    try {
      clearInterval(intervalId);
      setTimerExpired(false);
      setTimer(180);
      setTimeOut(false);
      dispatch(checkEmail({ email, nickname }));
      setTimerExpired(true);
      timeStart();
    } catch (e) {
      console.log(e);
    }
  };

  const onConfirm = () => {
    const { certificationNumber } = findPwd;
    if (isValidation === '') {
      setConfirmFailure(errorMessages.confirmFail);
      return;
    } else if (certificationNumber !== isValidation) {
      console.log('실패');
      setConfirmFailure(errorMessages.different);
      return;
    } else {
      setConfirmFailure(null);
      console.log('성공');
    }
  };

  return (
    <>
      <FindPwdSecond onChange={onChange} onConfirm={onConfirm} findPwd={findPwd} error={error} />
    </>
  );
};

export default FindPwdSecondContainer;
