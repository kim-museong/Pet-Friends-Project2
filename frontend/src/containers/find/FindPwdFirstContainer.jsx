import { useCallback, useEffect, useState } from 'react';
import FindPwdFirst from '../../components/find/FindPwdFirst';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, changeError, nextStep, initialize, findUser, initNumber } from '../../modules/find';

const FindPwdFirstContainer = () => {
  //-------------- state ------------------
  const [errorKeyMap, setErrorKeyMap] = useState({
    userId: 'userIdError',
  });
  const [errorMessages, setErrorMessages] = useState({
    userIdError: '・ 아이디: 아이디를 입력해주세요.',
    notUserError: '・ 아이디: 없는 아이디거나 아이디가 틀렸습니다.',
  });

  // ------------ 리덕스 -------------------
  const dispatch = useDispatch();
  const { findPwd, error } = useSelector(({ find }) => ({
    findPwd: find.findPwd,
    error: find.findPwd.error,
  }));

  // ------------- 유효성 검사 함수 ----------------------------

  const validation = useCallback(
    async (name, value) => {
      if (name === 'userId') {
        if (value === '') {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: errorMessages.userIdError }));
        } else {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: null }));
          dispatch(changeError({ form: 'findPwd', key: 'notUserError', value: null }));
        }
      }
    },
    [dispatch, errorKeyMap, errorMessages.userIdError],
  );

  // ------------ 인풋갑 변경 -------------------

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

  // --------------확인버튼 -------------------------

  const onConfirm = useCallback(async () => {
    const { userId } = findPwd;
    try {
      const res = await axios.post('/user/userIdConfirm', { userId });

      if (userId === '') {
        validation('userId', userId);
      } else if (!res.data) {
        dispatch(changeError({ form: 'findPwd', key: 'notUserError', value: errorMessages.notUserError }));
        return;
      } else {
        dispatch(findUser(res.data));
        dispatch(nextStep());
      }
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, errorMessages.notUserError, findPwd]);

  useEffect(() => {
    dispatch(initialize('findPwd'));
    dispatch(initNumber());
  }, [dispatch]);

  return (
    <>
      <FindPwdFirst onChange={onChange} onConfirm={onConfirm} error={error} findPwd={findPwd} />
    </>
  );
};

export default FindPwdFirstContainer;
