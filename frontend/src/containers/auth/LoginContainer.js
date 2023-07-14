import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { check } from '../../modules/user';
import Login from '../../components/auth/Login';
import { initialize } from '../../modules/find';

const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const theme = useSelector((state) => state.theme.theme);

  const COOKIE_NAME = 'savedUserId';
  const inputRefs = {
    username: useRef(null),
    password: useRef(null),
  };
  const checkBoxRef = useRef(null);
  const [error, setError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // 인풋값 이름에 따라 인풋 값 변경
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  //비밀번호 보이기 이벤트
  const onShowPwd = () => {
    setShowPwd((prev) => !prev);
  };

  //로그인시 유효값 체크 후 로그인 실행
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = form;

    if (!username) {
      setError('아이디를 입력해주세요.');
      return;
    }
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    dispatch(login({ username, password }));
  };

  const saveUserIdCookie = (id, checked) => {
    if (checked) {
      // 쿠키에 아이디 저장
      document.cookie = `${COOKIE_NAME}=${id}`;
    } else {
      // 쿠키에서 아이디 삭제
      document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
  };

  //체크유무 저장
  const onSaveUserId = (e) => {
    const { checked } = e.target;
    setIsChecked(checked);
  };

  //아이콘 누름에 따라 포커스
  const iconClick = (name) => {
    if (inputRefs[name].current) {
      inputRefs[name].current.focus();
    }
  };

  //체크박스 클릭 이벤트
  const checkBoxSelect = () => {
    checkBoxRef.current.checked = !checkBoxRef.current.checked;
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
    dispatch(initialize('findPwd'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생', authError);
      setError('없는 아이디거나 비밀번호가 틀렸습니다.');
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [dispatch, auth, authError]);

  //페이지 로딩 시 쿠키에서 아이디와 체크 여부 복원
  useEffect(() => {
    const cookie = document.cookie;
    const savedIdCookie = cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${COOKIE_NAME}=`));
    if (savedIdCookie) {
      const savedId = savedIdCookie.split('=')[1];
      setIsChecked(true);
      onChange({ target: { name: 'username', value: savedId } });
    }
  }, []);

  //값변경에 따른 쿠키 저장 순서 중요!

  useEffect(() => {
    if (isChecked) {
      const { username } = form;
      saveUserIdCookie(username, true);
    }

    if (!isChecked) {
      saveUserIdCookie('', false);
    }
  }, [form, isChecked]);

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
    <Login
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      isChecked={isChecked}
      onSaveUserId={onSaveUserId}
      showPwd={showPwd}
      onShowPwd={onShowPwd}
      iconClick={iconClick}
      checkBoxSelect={checkBoxSelect}
      inputRefs={inputRefs}
      checkBoxRef={checkBoxRef}
      theme={theme}
    />
  );
};

export default LoginContainer;
