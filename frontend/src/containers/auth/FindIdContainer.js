import axios from 'axios';
import { useCallback, useState } from 'react';
import { changeError, changeInput, initialize } from '../../modules/find';
import FindId from '../../components/auth/FindId';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const FindIdContainer = () => {
  // ------------- state ---------------------
  const [getUserId, setGetUserId] = useState('');
  const [showBox, setShowBox] = useState(false);
  const [confirmFail, setConfirmFailure] = useState(null);
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
      }
    },
    [dispatch, errorKeyMap, errorMessages.nickname],
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
        if (res.data) {
          setGetUserId(res.data);
          setConfirmFailure(null);
          console.log('성공');
          setShowBox(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onCancel = () => {
    setShowBox(false);
    dispatch(initialize('findId'));
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
        error={error}
        onConfirm={onConfirm}
        showBox={showBox}
        getUserId={getUserId}
        onCancel={onCancel}
        confirmFail={confirmFail}
      />
    </>
  );
};

export default FindIdContainer;
