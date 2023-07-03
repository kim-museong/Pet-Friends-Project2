import { useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { changeInput, initializeForm, isAlert } from '../../modules/find';
import FindId from '../../components/auth/FindId';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const FindIdContainer = () => {
  const [isNickname, setNickname] = useState(true);
  const [email, setEmail] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { findId, init } = useSelector(({ find }) => ({
    findId: find.findId,
    init: find.init,
  }));

  //아이디 뒤에 별붙이기
  const masked = (str) => {
    const visibleCharacters = str.slice(0, -3);
    const maskedCharacters = '*'.repeat(str.length - 3);
    return visibleCharacters + maskedCharacters;
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
  };

  //닉네임 찾기 함수
  const findNickname = async () => {
    console.log('asd');
    const { nickname } = findId;
    try {
      if (nickname === '') {
        dispatch(
          isAlert({
            valid: true,
            result: '닉네임을 입력해주세요.',
            isResult: true,
          }),
        );
        return;
      }

      const response = await axios.post('/users/findNickname', {
        findID: nickname,
      });

      if (response.data === null) {
        dispatch(
          isAlert({
            result: '존재하지 않는 닉네임입니다.',
            isResult: true,
            valid: true,
          }),
        );
        return;
      }
      const maskedResult = masked(response.data.userId);
      dispatch(isAlert({ result: maskedResult, isResult: true, valid: false }));
    } catch (e) {
      console.log(e);
    }
  };

  //이메일 전송 함수
  const findEmail = async () => {
    const { email } = findId;
    try {
      if (email === '') {
        dispatch(
          isAlert({
            result: '이메일을 입력해주세요.',
            isResult: true,
            valid: true,
          }),
        );
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        dispatch(
          isAlert({
            result: '이메일 형식에 맞게 입력해주세요.',
            isResult: true,
            valid: true,
          }),
        );
        return;
      }

      dispatch(
        isAlert({
          result: '이메일이 전송되었습니다.',
          isResult: true,
          valid: false,
        }),
      );
      await axios.post('/users/findIdEmail', {
        findEmail: email,
      });
    } catch (e) {
      dispatch(isAlert({ result: '이메일이 전송이 실패하였습니다.', isResult: true }));
      console.log(e);
    }
  };

  const selectnick = useCallback(() => {
    setEmail(false);
    setNickname(true);
    dispatch(isAlert({ isResult: false }));
  }, [dispatch]);

  const selectEmail = useCallback(() => {
    setNickname(false);
    setEmail(true);
    dispatch(isAlert({ isResult: false }));
  }, [dispatch]);

  const onCheck = useCallback(() => {
    dispatch(isAlert({ result: '', isResult: false, valid: false }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeForm('findId'));
  }, [dispatch]);

  return (
    <>
      <FindId
        type="findId"
        findId={findId}
        init={init}
        isNickname={isNickname}
        theme={theme}
        onChange={onChange}
        findNickname={findNickname}
        findEmail={findEmail}
        selectnick={selectnick}
        selectEmail={selectEmail}
        onCheck={onCheck}
      />
    </>
  );
};

export default FindIdContainer;
