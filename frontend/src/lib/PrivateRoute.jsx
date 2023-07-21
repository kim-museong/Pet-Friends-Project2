import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export function PrivateRoute({ auth }) {
  const user = !!useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(3);

  useEffect(() => {
    let timer;
    if (auth === true && user === false) {
      // 로그인 필요한 페이지에 접근하려고 하면서 비로그인 상태인 경우
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000); // 1초마다 시간 업데이트

      // 3초 뒤에 페이지를 이동
      setTimeout(() => {
        clearInterval(timer); // 타이머 정리
        setRemainingTime(3); // 시간 초기화
        // 로그인 페이지로 이동
        navigate('/auth/login');
      }, 3000);
    }

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [auth, navigate, user]);

  console.log('Private Route 진입');
  if (auth === false && user === false) {
    console.log('비로그인 필요한곳에서 비로그인임');
    return <Outlet />;
  } else if (auth === false && user === true) {
    console.log('비로그인 필요한곳에서 로그인임');
    return <Outlet />;
    // return <Navigate to={'/permission'} />;
  } else if (auth === true && user === false) {
    console.log('로그인 필요한곳에서 비로그인임');
    // 남은 시간 표시
    return <>{remainingTime}초 후에 로그인 페이지로 이동</>;
    // TODO : 타이머 화면 만들기
    // return <Navigate to={'/auth/login'} />;
  } else if (auth === true && user === true) {
    console.log('로그인 필요한곳에서 로그인임');
    return <Outlet />;
  }
}
