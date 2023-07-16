import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeError, changeField, initializeForm, register } from '../../modules/auth';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';
import Register from '../../components/auth/Register';
import axios from 'axios';

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const { form, auth, authError, user, error } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
    error: auth.register.error,
  }));
  const theme = useSelector((state) => state.theme.theme);
  const errorKeyMap = {
    username: 'errorUserId',
    password: 'errorPwd',
    passwordConfirm: 'errorPwdCf',
    nickname: 'errorNickname',
    email: 'errorEmail',
  };

  const errorMessages = {
    username: '아이디: 필수 정보입니다.',
    password: '비밀번호: 필수 정보입니다.',
    nickname: '이름: 필수 정보입니다.',
    email: '이메일: 필수 정보입니다.',
    passwordMismatch: '비밀번호: 비밀번호가 틀립니다.',
    invalidEmail: '이메일: 이메일 형식에 맞게 입력해주세요.',
  };

  const inputRefs = {
    username: useRef(null),
    password: useRef(null),
    passwordConfirm: useRef(null),
    nickname: useRef(null),
    email: useRef(null),
  };

  //아이콘 누름에 따라 포커스
  const iconClick = (name) => {
    if (inputRefs[name].current) {
      inputRefs[name].current.focus();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { errorUserId, errorPwd, errorPwdCf, errorEmail, errorNickname } = error;
    const { username, password, email, nickname, passwordConfirm } = form;

    validation('username', username);
    validation('password', password);
    validation('email', email);
    validation('nickname', nickname);

    if (
      errorUserId === null &&
      errorPwd === null &&
      errorPwdCf === null &&
      errorEmail === null &&
      errorNickname === null
    ) {
      dispatch(register({ username, password, email, nickname }));
    }

    if (password !== passwordConfirm) {
      dispatch(
        changeError({
          key: errorKeyMap.password,
          value: errorMessages.passwordMismatch,
        }),
      );
      return;
    }
  };

  //값이 바뀔 때//
  const onChange = async (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  //인풋 포커스 아웃 될 때 유효검사
  const focusOut = async (e) => {
    const { value, name } = e.target;
    validation(name, value);
  };

  const validation = async (name, value) => {
    //-------------- 아이디 검사 ------------------
    if (name === 'username') {
      const regex = /^[a-z0-9]{5,20}$/; //[영문 소문자, 숫자]{길이 검사} 코드
      if (value === '') {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: errorMessages.username,
          }),
        );
      } else if (!regex.test(value)) {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: '아이디: 5~20자의 영문 소문자, 숫자만 사용 가능합니다.',
          }),
        );
      } else {
        const response = await axios.post('/auth/sameUserId', { value });
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: response.data ? '아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.' : null,
          }),
        );
      }
    } else if (name === 'password') {
      const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[\p{S}!@#$%^&*()~])[a-zA-Z\d\p{S}!@#$%^&*()~]{8,20}$/u;

      if (value === '') {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: errorMessages.password,
          }),
        );
      } else if (!regex.test(value)) {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: '비밀번호는 8~20자 영문 소문자, 숫자, 특수문자를 포함해야 합니다.',
          }),
        );
      } else {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: null,
          }),
        );
      }
    } else if (name === 'nickname') {
      const regex = /^[가-힣a-zA-Z0-9]+$/;
      if (value === '') {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: errorMessages.nickname,
          }),
        );
      } else if (!regex.test(value)) {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: '이름: 한글, 영문 대/소문자, 숫자를 사용해 주세요. (특수기호, 공백 사용 불가)',
          }),
        );
      } else {
        const response = await axios.post('/auth/sameNickname', { value });
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: response.data ? '닉네임: 사용할 수 없는 닉네임입니다. 다른 닉네임를 입력해 주세요.' : null,
          }),
        );
      }
    } else if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value === '') {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: errorMessages.email,
          }),
        );
      } else if (!emailRegex.test(value)) {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: errorMessages.invalidEmail,
          }),
        );
      } else {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: null,
          }),
        );
      }
    }
  };

  const sendPhone = async (e) => {
    e.preventDefault();
    const { phone } = form;
    console.log(phone, '------------------------------------');
    try {
      const res = await axios.post('/auth/sendPhone', { phone: phone });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        return;
      }
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      console.log('check API 성공');
      console.log(user);
    }
  }, [user]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [navigate, user]);

  return (
    <Register
      type="register"
      form={form}
      onChange={onChange}
      error={error}
      onSubmit={onSubmit}
      theme={theme}
      iconClick={iconClick}
      inputRefs={inputRefs}
      focusOut={focusOut}
      sendPhone={sendPhone}
    />
  );
};

export default RegisterContainer;
