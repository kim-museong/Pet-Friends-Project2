import axios from 'axios';
import { useCallback, useState } from 'react';
import { changeError, changeInput, initNumber, initialize } from '../../modules/find';
import FindId from '../../components/auth/FindId';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const FindIdContainer = () => {
  // ------------- state ---------------------
  const [isValidation, setIsValidation] = useState('');
  const [getUserId, setGetUserId] = useState('');
  const [showBox, setShowBox] = useState(false);
  const [timer, setTimer] = useState(180); // 3분
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [confirmFail, setConfirmFailure] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [errorKeyMap, setErrorKeyMap] = useState({
    nickname: 'nicknameError',
    email: 'emailError',
  });

  // ---------------- 리덕스 ---------------------
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { findId, error } = useSelector(({ find }) => ({
    findId: find.findId,
    error: find.findId.error,
  }));

  // -------------- 에러별 이름과 내용 --------------

  const errorMessages = {
    nickname: '・ 이름: 이름을 입력해주세요.',
    email: '・ 이메일: 이메일을 입력해주세요.',
    confirmFail: '・ 인증: 인증번호를 입력해주세요.',
    different: '・ 인증: 인증번호가 틀립니다.',
  };

  // ---------- 초를 분:초로 바꾸기 -----------------
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // ------------ 아이디 뒤에 별붙이기 -----------------
  const masked = (str) => {
    const visibleCharacters = str.slice(0, -4);
    const maskedCharacters = '*'.repeat(Math.max(str.length - 4, 0));
    return visibleCharacters + maskedCharacters;
  };

  // ------------- 유효성 검사 함수 ----------------------------
  const validation = useCallback(
    async (name, value) => {
      if (name === 'nickname') {
        if (value === '') {
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: errorMessages.nickname }));
        } else {
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: null }));
        }
      } else if (name === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value === '') {
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: errorMessages.email }));
          return;
        } else if (!emailRegex.test(value)) {
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: '이메일 형식이 오류' }));
          return;
        } else {
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: null }));
        }
      }
    },
    [dispatch, errorKeyMap, errorMessages.email, errorMessages.nickname],
  );

  //-------------- 인풋값 변경 함수 --------------------
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeInput({
        form: 'findId',
        key: name,
        value,
      }),
    );
    validation(name, value);
  };

  //---------- 이메일 전송 함수 -------------
  const findEmail = async () => {
    const { email, nickname } = findId;
    const { nicknameError, emailError } = error;
    validation('nickname', nickname);
    validation('email', email);

    try {
      if (nicknameError === null && emailError === null) {
        clearInterval(intervalId);
        setTimerExpired(false);
        setTimer(180);
        setTimeOut(false);
        const response = await axios.post('/user/findId', {
          email,
          nickname,
        });
        setIsValidation(response.data.generatedCode);
        setGetUserId(masked(response.data.isEmail.userId));
        dispatch(changeError({ form: 'findId', key: 'email', value: response.data ? '' : '이메일 전송 실패' }));
        setTimerExpired(true);
        timeStart();
      }
    } catch (e) {
      console.log(e);
    }
  };

  //----------- 인증번호 확인 함수 -------------------
  const onConfirm = () => {
    const { certificationNumber } = findId;
    if (isValidation === '') {
      setConfirmFailure(errorMessages.confirmFail);
      return;
    } else if (certificationNumber !== isValidation) {
      console.log('실패');
      setShowBox(false);
      setConfirmFailure(errorMessages.different);
      return;
    } else {
      setConfirmFailure(null);
      console.log('성공');
      setShowBox(true);
    }
  };

  const onCancel = () => {
    setShowBox(false);
    dispatch(initialize('findId'));
    clearInterval(intervalId);
    setTimerExpired(false);
    setTimer(180);
    setTimeOut(false);
  };

  // ----------- 타이머 함수 --------------

  const timeStart = () => {
    setTimerExpired(true);
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          setTimeOut(true);
          dispatch(initNumber());
          return;
        }
        return prevTimer - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  // ----------findId 초기화 -------------------
  useEffect(() => {
    dispatch(initialize('findId'));
  }, [dispatch]);

  return (
    <>
      <FindId
        type="findId"
        findId={findId}
        theme={theme}
        onChange={onChange}
        findEmail={findEmail}
        error={error}
        onConfirm={onConfirm}
        showBox={showBox}
        getUserId={getUserId}
        onCancel={onCancel}
        timerExpired={timerExpired}
        timer={timer}
        formatTime={formatTime}
        timeOut={timeOut}
        confirmFail={confirmFail}
      />
    </>
  );
};

export default FindIdContainer;
