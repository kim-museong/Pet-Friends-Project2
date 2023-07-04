import { useEffect, useRef } from 'react';
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
    username: '아이디: 아이디를 입력해주세요.',
    password: '비밀번호: 비밀번호를 입력해주세요.',
    nickname: '이름: 이름를 입력해주세요.',
    email: '이메일: 이메일를 입력해주세요.',
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
    const { username, password, passwordConfirm, email, nickname } = form;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username === '' || password === '' || nickname === '' || email === '') {
      if (username === '') {
        dispatch(
          changeError({
            key: errorKeyMap.username,
            value: errorMessages.username,
          }),
        );
      } else {
        dispatch(
          changeError({
            key: errorKeyMap.username,
            value: '',
          }),
        );
      }

      if (password === '') {
        dispatch(
          changeError({
            key: errorKeyMap.password,
            value: errorMessages.password,
          }),
        );
      } else {
        dispatch(
          changeError({
            key: errorKeyMap.password,
            value: '',
          }),
        );
      }

      if (nickname === '') {
        dispatch(
          changeError({
            key: errorKeyMap.nickname,
            value: errorMessages.nickname,
          }),
        );
      } else {
        dispatch(
          changeError({
            key: errorKeyMap.nickname,
            value: '',
          }),
        );
      }

      if (email === '') {
        dispatch(
          changeError({
            key: errorKeyMap.email,
            value: errorMessages.email,
          }),
        );
      } else {
        dispatch(
          changeError({
            key: errorKeyMap.email,
            value: '',
          }),
        );
      }

      return;
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

    if (!emailRegex.test(email)) {
      dispatch(
        changeError({
          key: errorKeyMap.email,
          value: errorMessages.invalidEmail,
        }),
      );
      return;
    }

    dispatch(register({ username, password, email, nickname }));
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

    //사용 아아디 체크
    if (name === 'username') {
      const response = await axios.post('/auth/sameUserId', { value });
      dispatch(
        changeError({
          key: errorKeyMap[name],
          value: response.data ? '아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.' : '',
        }),
      );
    } else {
      //에러 삭제
      if (value !== '') {
        dispatch(
          changeError({
            key: errorKeyMap[name],
            value: '',
          }),
        );
      }
    }
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

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
    />
  );
};

export default RegisterContainer;
