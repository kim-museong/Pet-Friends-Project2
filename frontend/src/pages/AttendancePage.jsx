import AttendanceContainer from '../containers/main/AttendanceContainer';
import { Helmet } from 'react-helmet-async';
const AttendancePage = () => {
  return (
    <>
      <Helmet>
        <title>펫프렌즈</title>
      </Helmet>
      <AttendanceContainer />
    </>
  );
};

export default AttendancePage;
