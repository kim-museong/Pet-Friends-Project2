import axios from 'axios';
import { useCallback, useState } from 'react';
import { changeError, changeInput, initialize } from '../../modules/find';
import FindId from '../../components/auth/FindId';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkPhone, initNumber } from '../../modules/auth';

const FindIdContainer = () => {
  // ------------- state ---------------------
  const [getUserId, setGetUserId] = useState('');
  const [showBox, setShowBox] = useState(false);
  const [confirmFail, setConfirmFailure] = useState(null);
  const [findType, setFindType] = useState('nickname');
  const [timer, setTimer] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [sendSuccess, setSnedSuccess] = useState('');
  const [errorKeyMap, setErrorKeyMap] = useState({
    nickname: 'nicknameError',
    phone: 'errorPhone',
  });

  // ---------------- 리덕스 ---------------------
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { findId, error, form, errors } = useSelector(({ auth, find }) => ({
    findId: find.findId,
    error: find.findId.error,
    form: auth.register,
    errors: auth.register.error,
  }));

  // -------------- 에러별 이름과 내용 --------------

  const [messages, setMessages] = useState({
    nickname: '이름을 입력해주세요.',
    notNickname: '이름이 다르거나 없는 이름입니다.',
    errorPhone: '번호을 입력해주세요.',
    phoneRegexError: '번호형식에 맞게 입력해주세요.',
    certificationError: '인증번호를 입력해주세요.',
    different: '인증번호가 틀립니다.',
    sendSuccess: '이메일이 성공적으로 전송되었습니다.',
  });

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
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: messages.nickname }));
        } else {
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: null }));
        }
      } else if (name === 'phone') {
        const phoneRegex = /^[0-9]+$/;
        if (value === '') {
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: messages.errorPhone }));
          return;
        } else if (!phoneRegex.test(value) || value.length !== 11) {
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: messages.phoneRegexError }));
        } else {
          dispatch(changeError({ form: 'findId', key: errorKeyMap[name], value: null }));
        }
      }
    },
    [dispatch, errorKeyMap, messages.nickname],
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

  //----------- 인증번호 확인 함수 -------------------
  const onConfirm = async () => {
    const { nickname } = findId;
    validation('nickname', nickname);
    if (nickname) {
      try {
        const res = await axios.post('/user/findId', { nickname: nickname });
        console.log(res.data === '');
        if (res.data === '') {
          dispatch(changeError({ form: 'findId', key: 'nicknameError', value: messages.notNickname }));
          return;
        }
        setGetUserId(res.data);
        setConfirmFailure(null);
        console.log('성공');
        setShowBox(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const changeRadio = (e) => {
    setFindType(e.target.value);
    console.log(findType);
    console.log(e.target.value);
  };

  const onCancel = () => {
    setShowBox(false);
    dispatch(initialize('findId'));
  };

  // ----------findId 초기화 -------------------
  useEffect(() => {
    dispatch(initialize('findId'));
  }, [dispatch]);

  const onfindPhone = async () => {
    const { certificationNumber } = form;
    const { certification } = findId;
    const { phone } = findId;
    if (certification === '') {
      dispatch(changeError({ form: 'findId', key: 'errorConfirm', value: messages.certificationError }));
      return;
    } else if (certification !== certificationNumber) {
      dispatch(changeError({ form: 'findId', key: 'errorConfirm', value: messages.different }));
      return;
    } else {
      dispatch(changeError({ form: 'findId', key: 'errorConfirm', value: null }));

      if (phone) {
        try {
          const res = await axios.post('/user/findId', { phone: phone });
          console.log(res.data === '');
          if (res.data === '') {
            dispatch(changeError({ form: 'findId', key: 'nicknameError', value: messages.notNickname }));
            return;
          }
          setGetUserId(res.data);
          setConfirmFailure(null);
          console.log('성공');
          setShowBox(true);
        } catch (e) {
          console.log(e);
        }
      }
      console.log('성공');
    }
  };

  const sendPhone = async (e) => {
    e.preventDefault();
    const { phone } = findId;
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
      <FindId
        type="findId"
        form={form}
        findId={findId}
        theme={theme}
        onChange={onChange}
        error={error}
        errors={errors}
        onConfirm={onConfirm}
        showBox={showBox}
        getUserId={getUserId}
        onCancel={onCancel}
        confirmFail={confirmFail}
        masked={masked}
        findType={findType}
        changeRadio={changeRadio}
        sendPhone={sendPhone}
        timerExpired={timerExpired}
        timeOut={timeOut}
        timer={timer}
        formatTime={formatTime}
        sendSuccess={sendSuccess}
        onfindPhone={onfindPhone}
      />
    </>
  );
};

export default FindIdContainer;
