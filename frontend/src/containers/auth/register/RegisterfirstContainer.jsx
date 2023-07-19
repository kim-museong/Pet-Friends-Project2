import { useDispatch, useSelector } from 'react-redux';
import Registerfirst from '../../../components/auth/register/Registerfirst';
import { changeField, changeError, checkPhone, initNumber } from '../../../modules/auth';
import { useState, useCallback } from 'react';
import { nextStep } from '../../../modules/auth';

const RegisterfirstContainer = () => {
  const [timer, setTimer] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [sendSuccess, setSnedSuccess] = useState('');
  const [errorKeyMap, setErrorKeyMap] = useState({
    phone: 'errorPhone',
  });
  const [messages, setMessages] = useState({
    errorPhone: '・ 번호: 번호을 입력해주세요.',
    phoneRegexError: '・ 번호: 번호형식에 맞게 입력해주세요.',
    certificationError: '・ 인증: 인증번호를 입력해주세요.',
    different: '・ 인증: 인증번호가 틀립니다.',
    sendSuccess: '・ 전송: 이메일이 성공적으로 전송되었습니다.',
  });
  const { form, theme, register, error } = useSelector(({ auth, theme }) => ({
    form: auth.register,
    theme: theme.theme,
    register: auth.register,
    error: auth.register.error,
  }));
  const dispatch = useDispatch();

  const validation = useCallback(
    async (name, value) => {
      if (name === 'phone') {
        const phoneRegex = /^[0-9]+$/;
        if (value === '') {
          dispatch(changeError({ key: errorKeyMap[name], value: messages.errorPhone }));
          return;
        } else if (!phoneRegex.test(value) || value.length !== 11) {
          dispatch(changeError({ key: errorKeyMap[name], value: messages.phoneRegexError }));
        } else {
          dispatch(changeError({ key: errorKeyMap[name], value: null }));
        }
      }
    },
    [dispatch, errorKeyMap, messages.errorPhone, messages.phoneRegexError],
  );

  const onChange = async (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );

    validation(name, value);
  };

  const onConfirm = () => {
    const { certification, certificationNumber } = register;
    if (certification === '') {
      dispatch(changeError({ key: 'errorConfirm', value: messages.certificationError }));
      return;
    } else if (certification !== certificationNumber) {
      dispatch(changeError({ key: 'errorConfirm', value: messages.different }));
      return;
    } else {
      dispatch(changeError({ key: 'errorConfirm', value: null }));
      dispatch(nextStep());
      console.log('성공');
    }
  };

  const sendPhone = async (e) => {
    e.preventDefault();
    const { phone } = form;
    validation('phone', phone);
    if (phone.length === 11) {
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
          dispatch(initNumber());
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    setIntervalId(id);
  }, []);

  return (
    <>
      <Registerfirst
        theme={theme}
        form={form}
        error={error}
        onChange={onChange}
        sendPhone={sendPhone}
        timerExpired={timerExpired}
        timeOut={timeOut}
        timer={timer}
        formatTime={formatTime}
        onConfirm={onConfirm}
        sendSuccess={sendSuccess}
      />
    </>
  );
};

export default RegisterfirstContainer;
