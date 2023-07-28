import Calendar from 'react-calendar';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import 'react-calendar/dist/Calendar.css';

const AttendanceBackRound = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(35,35,35)' : `${palette.mainColor}`)};
  z-index: -1;
  border-radius: 0;
`;

const AttendanceBox = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px auto;

  .react-calendar {
    width: 70%;
    height: auto;
    margin: 0 auto;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(60,60,60)' : 'white')};
  }

  .react-calendar__navigation {
    margin: 0 auto;
    height: 70px;
    align-items: center;
    padding: 20px;

    button:not(:nth-child(3)) {
      width: 50px;
      height: 50px;
      font-size: 30px;
      color: ${palette.border};
      padding-bottom: 5px;

      @media (max-width: 600px) {
        width: 30px;
        height: 30px;
        font-size: 23px;
      }
    }

    button:nth-child(3) {
      width: 50px;
      height: 50px;
      border: none;
      font-weight: bold;
      color: ${({ theme }) => (theme === 'true' ? 'white' : `black`)};
    }

    button + button {
      margin-left: 15px;
    }
  }

  .react-calendar__navigation button {
    text-align: center;
    display: inline-block;
    padding: 0;
    border: 1px solid;
  }

  .react-calendar__month-view {
    padding: 10px;

    button {
      height: 70px;
      display: flex;
      flex-direction: column;
      padding: 5px;
      abbr,
      img {
        margin: 0 auto;
      }

      img {
        width: 40px;

        @media (max-width: 600px) {
          width: 25px;
        }
      }
    }

    .react-calendar__tile--active {
      background: ${({ theme }) => (theme === 'true' ? 'black' : `${palette.mainColor}`)};
    }

    @media (max-width: 600px) {
      button {
        height: 50px;
      }
    }
  }

  .react-calendar__tile--now {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'rgb(230,230,230)')};
  }

  .react-calendar__tile--now:hover {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : `${palette.border}`)};
  }
`;

const AttendancePoster = styled.div`
  background-image: url('../../../images/attend.png');
  height: 125px;
  background-repeat: no-repeat;
  background-size: 200px;
  background-position: 50% 50%;
  margin: 20px auto;
`;

const UserBox = styled.div`
  text-align: center;
  span {
    font-size: 18px;
    font-weight: bold;
  }

  div {
    margin-bottom: 5px;
  }
`;

export const Attendance = ({ renderStamp, theme, user }) => {
  return (
    <>
      <AttendanceBox theme={String(theme)}>
        <AttendanceBackRound theme={String(theme)} />
        <AttendancePoster />

        <UserBox>
          <div>
            안녕하세요! <span>{user.nickname}</span> 님
          </div>
          <div>{user.isAttendance ? '오늘 출석체크를 했습니다.' : '출석체크를 해주세요.'}</div>
          <div>
            출석횟수: <span> {user?.attend.length}</span>번
          </div>
        </UserBox>

        <Calendar tileContent={({ date }) => renderStamp(date)} />
      </AttendanceBox>
    </>
  );
};
