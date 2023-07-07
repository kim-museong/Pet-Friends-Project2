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

  background-image: url('../../../images/attend.png');
  background-repeat: no-repeat;
  background-size: 300px;
  background-position: 50% 10%;
`;

const AttendanceBox = styled.div`
  width: 100%;
  height: 100px;
  margin: 0 auto;
  margin-top: -200px;

  .react-calendar {
    width: 50%;
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
      border-radius: 50%;
      font-size: 30px;
      color: rgb(186, 186, 186);
      padding-bottom: 5px;
    }

    button:nth-child(3) {
      width: 50px;
      height: 50px;
      border: none;
      font-weight: bold;
    }

    button + button {
      margin-left: 15px;
    }
  }

  .react-calendar__navigation button {
    text-align: center !important;
    display: inline-block !important;
    padding: 0;
    border: 1px solid;
  }

  .react-calendar__month-view {
    padding: 30px;
    button {
      height: 66px;
      display: flex;
      flex-direction: column;
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
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'rgb(186,186,186)')};
  }
`;

const AttendanceCalender = styled.div`
  margin-top: 500px;
`;

export const Attendance = ({ renderStamp, theme }) => {
  return (
    <>
      <AttendanceBackRound theme={String(theme)} />
      <AttendanceBox theme={String(theme)}>
        <AttendanceCalender>
          <Calendar tileContent={({ date }) => renderStamp(date)} />
        </AttendanceCalender>
      </AttendanceBox>
    </>
  );
};
