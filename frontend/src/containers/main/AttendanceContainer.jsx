import { useCallback, useEffect, useState } from 'react';
import { Attendance } from '../../components/main/Attendance';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AttendanceContainer = () => {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);
  const [attendanceDates, setAttendanceDates] = useState('');
  // 출석 날짜 배열 (DB에서 가져온 데이터라고 가정)

  const getAttendance = async () => {
    if (!user) {
      return;
    }
    const response = await axios.post('/user/getAttendance', { id: user.id });
    setAttendanceDates(response.data);
  };

  const renderStamp = useCallback(
    (date) => {
      if (!attendanceDates) {
        console.log('로그인 필요');
        return;
      }
      const dateString = date.toLocaleDateString('ko-KR');
      const hasStamp = attendanceDates.some((attendance) => {
        const attendanceDate = new Date(attendance.checkInTime);
        const attendanceDateString = attendanceDate.toLocaleDateString('ko-KR');
        return attendanceDateString === dateString;
      });
      if (hasStamp) {
        return <img style={{ width: '40px' }} src="/images/stamp.png" alt="stamp" />;
      }

      return null;
    },
    [attendanceDates],
  );

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <>
      <Attendance theme={theme} renderStamp={renderStamp} />
    </>
  );
};

export default AttendanceContainer;
