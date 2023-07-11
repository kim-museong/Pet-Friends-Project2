import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import FindPwd from '../../components/auth/FindPwd';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, checkEmail, initializeForm } from '../../modules/find';

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
      const response = await axios.post('/user/findPwdPhone', {
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
      return;
    }
  };

  const onCheck = () => {
    const { validConfirm } = form;
    if (validConfirm.trim('') === certificationNum) {
    } else {
    }
  };

  const onComplete = useCallback(() => {}, [dispatch]);

  const onSubmitPwd = async (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = form;
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
