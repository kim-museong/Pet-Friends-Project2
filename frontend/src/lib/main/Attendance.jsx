import styled from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../../node_modules/axios/index';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import palette from '../../lib/styles/palette';

const AttendanceBox = styled.div`
  width: 240px;
  height: 287px;
  border: 1px solid ${palette.border};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  top: 434px;
  left: 944px;
  text-align: center;
  padding: 10px;
  .attend {
    display: block;
    width: 130px;
    height: 130px;
    margin: 10px auto 0;
    cursor: pointer;
    background: none;
    border: none;
    background-image: url('../../../images/attend.png');
    background-size: 730px;
    background-repeat: no-repeat;
    background-position: ${({ isconfirm }) =>
      isconfirm === 'true' ? '16.8% 72%' : ' 82% 72%;'}; /* 이미지를 가로로 50% 위치로 이동 */
  }

  .attendBtn {
    width: 80%;
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    background-color: ${palette.mainColor};
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: ${palette.border};
    }
  }

  .attendBtn:disabled {
    background-color: rgba(186, 186, 186, 0.6);
    color: ${palette.border};
  }
`;

const BlackBox = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 5;
`;

const IsLoginBox = styled.div`
  width: 600px;
  height: 400px;
  position: absolute;
  top: 25%;
  left: 33%;

  background: ${({ theme }) => (theme === 'true' ? 'rgb(35,35,35)' : 'white')};

  .btn {
    display: block;
    width: 60%;
    text-align: center;
    background: ${palette.mainColor};
    color: white;
    padding: 15px 10px;
    margin: 20px auto 10px;
    font-weight: bold;
    font-size: 20px;

    &:hover {
      background: ${palette.border};
    }
  }
`;

const Attendance = () => {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme);
  const [cancel, setCancel] = useState(true);
  const [isConfirm, setIsConfirm] = useState(null);
  const date = new Date();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  const confirm = useCallback(async () => {
    if (user) {
      const { userId } = user;
      if (userId === null) {
        return;
      } else {
        const response = await axios.post('/user/isAttendance', { userId });
        setIsConfirm(response.data);
        console.log('검사', isConfirm);
      }
    } else {
      setIsConfirm('');
    }
  }, [user]);

  const handleCheckIn = async () => {
    if (!user) {
      console.log('로그인을 해야함');
      setCancel(false);
      return;
    } else {
      const { userId, id } = user;
      console.log('출석');
      const response = await axios.post('/user/attendance', { userId, id });
      console.log(response);
      confirm();
    }
  };

  const onCancel = () => {
    setCancel(true);
  };

  useEffect(() => {
    confirm();
  }, [confirm]);

  return (
    <>
      {!cancel && (
        <BlackBox onClick={onCancel}>
          <IsLoginBox theme={String(theme)}>
            <p>로그인이 필요합니다.</p>
            로그인하러가기
            <Link to="/auth/login" className="btn">
              로그인
            </Link>
            <p>회원정보가 없습니까?</p>
            <Link to="/auth/register" className="btn">
              회원가입
            </Link>
          </IsLoginBox>
        </BlackBox>
      )}

      <AttendanceBox isconfirm={String(isConfirm)} theme={String(theme)}>
        {isConfirm ? (
          <>
            <div>{user?.nickname}님</div>
            <div>
              {month}월 {day}일 출석 했습니다.
            </div>
          </>
        ) : (
          <p>출석을 해주세요.</p>
        )}
        <button className="attend" onClick={handleCheckIn} disabled={isConfirm}></button>
        <button className="attendBtn" disabled={isConfirm} onClick={handleCheckIn}>
          출석하기
        </button>
      </AttendanceBox>
    </>
  );
};

export default React.memo(Attendance);
