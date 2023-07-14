import Calendar from 'react-calendar';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
// import '../../css.css';
import 'react-calendar/dist/Calendar.css';

const AttendanceBackRound = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(35,35,35)' : `${palette.mainColor}`)};
  z-index: -1;
`;

const AttendanceBox = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px auto;

  .react-calendar {
    width: 30%;
    margin-right: 20px;
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
      border-radius: 50%;
      font-size: 30px;
      color: ${palette.border};
      padding-bottom: 5px;
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
    }

    .react-calendar__tile--active {
      background: ${({ theme }) => (theme === 'true' ? 'black' : `${palette.mainColor}`)};
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
  height: 250px;
  background-repeat: no-repeat;
  background-size: 300px;
  background-position: 50% 10%;
`;

const UserBox = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid black;
`;

export const Attendance = ({ renderStamp, theme }) => {
  return (
    <>
      <AttendanceBackRound theme={String(theme)} />
      <AttendanceBox theme={String(theme)}>
        <AttendancePoster />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar tileContent={({ date }) => renderStamp(date)} />
          <UserBox></UserBox>
        </div>
      </AttendanceBox>
    </>
  );
};
