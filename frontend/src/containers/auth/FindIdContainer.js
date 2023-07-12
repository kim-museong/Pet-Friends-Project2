import axios from 'axios';
import { useState } from 'react';
import { changeError, changeInput, initializeForm } from '../../modules/find';
import FindId from '../../components/auth/FindId';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const FindIdContainer = () => {
  const [isValidation, setIsValidation] = useState('');
  const [getUserId, setGetUserId] = useState('');
  const [showBox, setShowBox] = useState(false);
  const [timer, setTimer] = useState(300); // 5분
  const [timerExpired, setTimerExpired] = useState(false);

  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { findId, error } = useSelector(({ find }) => ({
    findId: find.findId,
    error: find.findId.error,
  }));

  const errorKeyMap = {
    nickname: 'nicknameError',
    email: 'emailError',
  };

  const errorMessages = {
    nickname: '이름: 이름을 입력해주세요.',
    email: '이메일: 이메일을 입력해주세요.',
  };

  //아이디 뒤에 별붙이기
  const masked = (str) => {
    const visibleCharacters = str.slice(0, -4);
    const maskedCharacters = '*'.repeat(Math.max(str.length - 4, 0));
    return visibleCharacters + maskedCharacters;
  };

  const validation = async (name, value) => {
    if (name === 'nickname') {
      if (value === '') {
        dispatch(changeError({ key: errorKeyMap[name], value: errorMessages.nickname }));
      } else {
        dispatch(changeError({ key: errorKeyMap[name], value: null }));
      }
    } else if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value === '') {
        dispatch(changeError({ key: errorKeyMap[name], value: errorMessages.email }));
        return;
      } else if (!emailRegex.test(value)) {
        dispatch(changeError({ key: errorKeyMap[name], value: '이메일 형식이 오류' }));
        return;
      } else {
        dispatch(changeError({ key: errorKeyMap[name], value: null }));
      }
    }
  };

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

  //이메일 전송 함수
  const findEmail = async () => {
    const { email, nickname } = findId;
    const { nicknameError, emailError } = error;
    validation('nickname', nickname);
    validation('email', email);
    try {
      if (nicknameError === null && emailError === null) {
        const response = await axios.post('/user/findId', {
          email,
          nickname,
        });
        setIsValidation(response.data.generatedCode);
        setGetUserId(masked(response.data.isEmail.userId));
        dispatch(changeError({ key: 'email', value: response.data ? '' : '이메일 전송 실패' }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onConfirm = () => {
    const { certificationNumber } = findId;
    if (isValidation === '') {
      return;
    }
    if (certificationNumber !== isValidation) {
      console.log('실패');
      setShowBox(false);
      return;
    }
    console.log('성공');
    setShowBox(true);
  };

  const onCancel = () => {
    setShowBox(false);
  };

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setTimerExpired(true);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  useEffect(() => {
    dispatch(initializeForm('findId'));
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
      />
    </>
  );
};

export default FindIdContainer;
