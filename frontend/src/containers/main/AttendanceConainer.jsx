import styled from 'styled-components';

const AttendanceBox = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid;
  position: absolute;
  top: 40px;
  left: 75%;
`;

const AttendanceConainer = () => {
  return (
    <>
      <AttendanceBox>
        <h1>출석체크</h1>
      </AttendanceBox>
    </>
  );
};

export default AttendanceConainer;
