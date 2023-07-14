import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import FindPwdThird from '../../components/find/FindPwdThird';
import { useCallback, useState } from 'react';
import { changeInput, changeError, nextStep } from '../../modules/find';

const FindPwdThirdContainer = () => {
  const dispatch = useDispatch();
  const { findPwd, findUser, error } = useSelector(({ find }) => ({
    findPwd: find.findPwd,
    findUser: find.findPwd.findUser,
    error: find.findPwd.error,
  }));

  const [errorKeyMap, setErrorKeyMap] = useState({
    password: 'passwordError',
    passwordConfirm: 'passwordConfirmError',
  });
  const [messages, setMessages] = useState({
    different: '・비밀번호: 비밀번호는 8~20자 영문 소문자, 숫자, 특수문자를 포함해야 합니다.',
    passwordError: '・비밀번호: 비밀번호를 입력해주세요.',
    passwordConfirm: '・비밀번호: 비밀번호가 틀립니다.',
  });

  // ------------- 유효성 검사 함수 ----------------------------

  const validation = useCallback(
    async (name, value) => {
      if (name === 'password') {
        const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[\p{S}!@#$%^&*()~])[a-zA-Z\d\p{S}!@#$%^&*()~]{8,20}$/u;
        if (value === '') {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: messages.passwordError }));
        } else if (!regex.test(value)) {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: messages.different }));
        } else {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: null }));
          dispatch(changeError({ form: 'findPwd', key: 'notUserError', value: null }));
        }
      } else if (name === 'passwordConfirm') {
        if (value === '') {
          dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: messages.passwordConfirm }));
        }
      }
    },
    [dispatch, errorKeyMap, messages.different, messages.passwordError],
  );

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

  const onSubmitPwd = async (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = findPwd;
    validation('password', password);
    validation('passwordConfirm', passwordConfirm);
    if (password !== passwordConfirm) {
      dispatch(changeError({ form: 'findPwd', key: 'passwordConfirm', value: null }));
      return;
    }
    try {
      const response = await axios.post('/user/changePwd', {
        pwd: password,
        findEmail: findUser.email,
      });
      console.log(response.data.message);
      dispatch(nextStep());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <FindPwdThird onSubmitPwd={onSubmitPwd} onChange={onChange} findPwd={findPwd} error={error} />
    </>
  );
};

export default FindPwdThirdContainer;
