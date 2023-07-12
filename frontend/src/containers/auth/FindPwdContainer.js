import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import FindPwd from '../../components/auth/FindPwd';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, checkEmail, initializeForm, changeError } from '../../modules/find';

const FindPwdContainer = () => {
  const [certificationNum, setCertificationNum] = useState('');
  const [firstQ, setFirstQ] = useState(true);
  const [user, setUser] = useState(null);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { findPwd, isemail, emailError, init, error } = useSelector(({ find }) => ({
    findPwd: find.findPwd,
    isemail: find.isemail,
    emailError: find.emailError,
    init: find.init,
    error: find.findPwd.error,
  }));

  // -------------- 에러별 이름과 내용 --------------
  const errorKeyMap = {
    userId: 'userIdError',
    email: 'emailError',
  };

  const errorMessages = {
    userId: '* 아이디: 아이디를 입력해주세요.',
    notUserId: '* 아이디: 없는 아이디거나 아이디가 틀렸습니다.',
    email: '* 이메일: 이메일을 입력해주세요.',
    confirmFail: '* 인증: 인증번호를 입력해주세요.',
    different: '* 인증: 인증번호가 틀립니다.',
  };

  // ------------- 유효성 검사 함수 ----------------------------
  const validation = async (name, value) => {
    if (name === 'userId') {
      if (value === '') {
        dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: errorMessages.userId }));
      } else {
        dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: null }));
        dispatch(changeError({ form: 'findPwd', key: 'notUserError', value: null }));
      }
    } else if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value === '') {
        dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: errorMessages.email }));
        return;
      } else if (!emailRegex.test(value)) {
        dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: '이메일 형식이 오류' }));
        return;
      } else {
        dispatch(changeError({ form: 'findPwd', key: errorKeyMap[name], value: null }));
      }
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeInput({
        form: 'findPwd',
        key: name,
        value,
      }),
    );
    validation(name, value);
  };

  const nextQ = useCallback(async () => {
    const { userId } = findPwd;
    console.log(1234, userId);
    try {
      const res = await axios.post('/user/userIdConfirm', { userId });
      setUser(res.data);
      if (!res.data) {
        dispatch(
          changeError({ form: 'findPwd', key: 'notUserError', value: res.data ? null : errorMessages.notUserId }),
        );
        return;
      }
      setFirstQ(false);
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, errorMessages.notUserId, findPwd]);

  //이메일 전송 함수
  const findEmail = async () => {
    const { email, userId } = findPwd;
    console.log(email);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
      if (email === '') {
        return;
      }

      if (!emailRegex.test(email)) {
        return;
      }
      dispatch(checkEmail({ email, userId }));
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = () => {
    const { isConfirm } = init;
    console.log(isConfirm);
    if (isConfirm) {
      return;
    }
  };

  const onCheck = () => {
    const { validConfirm } = findPwd;
    if (validConfirm.trim('') === certificationNum) {
    } else {
    }
  };

  const onSubmitPwd = async (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = findPwd;
    if (password !== passwordConfirm) {
      return;
    }
    try {
      const response = await axios.post('/user/changePwd', {
        pwd: password,
        findEmail: isemail,
      });
      console.log(response.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (emailError) {
      return;
    }
    if (isemail) {
    }
  }, [isemail, emailError, dispatch]);

  useEffect(() => {
    dispatch(initializeForm('emailCheck'));
    dispatch(initializeForm('init'));
  }, [dispatch]);

  return (
    <>
      <FindPwd
        type="findPwd"
        error={error}
        findPwd={findPwd}
        init={init}
        theme={theme}
        onChange={onChange}
        findEmail={findEmail}
        onCheck={onCheck}
        onCancel={onCancel}
        onSubmitPwd={onSubmitPwd}
        nextQ={nextQ}
        firstQ={firstQ}
        user={user}
      />
    </>
  );
};

export default FindPwdContainer;
