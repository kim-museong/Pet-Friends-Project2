import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import FindPwd from '../../components/auth/FindPwd';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, checkEmail, initializeForm, isAlert } from '../../modules/find';

const FindPwdContainer = () => {
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(false);
  const [certificationNum, setCertificationNum] = useState('');
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { form, isemail, emailError, init } = useSelector(({ find }) => ({
    form: find.emailCheck,
    isemail: find.isemail,
    emailError: find.emailError,
    init: find.init,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeInput({
        form: 'emailCheck',
        key: name,
        value,
      }),
    );
  };

  const findPhone = async () => {
    const { phone, userId } = form;
    try {
      const response = await axios.post('/users/findPwdPhone', {
        phone,
        userId,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //이메일 전송 함수
  const findEmail = async () => {
    const { email, userId } = form;
    console.log(email);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
      dispatch(checkEmail({ email, userId }));
    } catch (e) {
      console.log(e);
    }
  };

  const selectPhone = useCallback(() => {
    setEmail(false);
    setPhone(true);
    dispatch(initializeForm('emailCheck'));
  }, [dispatch]);

  const selectEmail = useCallback(() => {
    setPhone(false);
    setEmail(true);
    dispatch(initializeForm('emailCheck'));
  }, [dispatch]);

  const onCancel = () => {
    const { isConfirm } = init;
    console.log(isConfirm);
    if (isConfirm) {
      dispatch(
        isAlert({
          valid: false,
          isResult: false,
          isConfirm: true,
        }),
      );
      return;
    }
    dispatch(
      isAlert({
        isResult: false,
        valid: false,
      }),
    );
  };

  const onCheck = () => {
    const { validConfirm } = form;
    if (validConfirm.trim('') === certificationNum) {
      dispatch(isAlert({ isResult: false, isConfirm: true }));
    } else {
      dispatch(
        isAlert({
          result: '인증번호가 틀립니다.',
          isResult: true,
          valid: true,
        }),
      );
    }
  };

  const onComplete = useCallback(() => {
    dispatch(isAlert({ isResult: false, valid: false, isConfirm: false }));
  }, [dispatch]);

  const onSubmitPwd = async (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      dispatch(
        isAlert({
          result: '비밀번호가 다릅니다.',
          isResult: true,
          valid: true,
          isConfirm: true,
        }),
      );
      return;
    }
    try {
      const response = await axios.post('/users/changePwd', {
        pwd: password,
        findEmail: isemail,
      });
      console.log(response.data.message);
      dispatch(
        isAlert({
          result: response.data.message,
          isResult: true,
          valid: true,
          isConfirm: true,
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (emailError) {
      dispatch(
        isAlert({
          result: '없는 아이디 입니다.',
          isResult: true,
          valid: true,
        }),
      );
      return;
    }
    if (isemail) {
      dispatch(
        isAlert({
          result: '입력한 이메일로 인증번호가 전송되었습니다.',
          isResult: true,
          valid: false,
        }),
      );
      setCertificationNum(isemail);
    }
  }, [isemail, emailError, dispatch]);

  useEffect(() => {
    dispatch(initializeForm('emailCheck'));
    dispatch(initializeForm('init'));
  }, [dispatch]);

  return (
    <>
      <FindPwd
        type="emailCheck"
        form={form}
        init={init}
        email={email}
        theme={theme}
        onChange={onChange}
        findPhone={findPhone}
        findEmail={findEmail}
        selectPhone={selectPhone}
        selectEmail={selectEmail}
        onCheck={onCheck}
        onCancel={onCancel}
        onSubmitPwd={onSubmitPwd}
        onComplete={onComplete}
      />
    </>
  );
};

export default FindPwdContainer;
