import { useSelector } from 'react-redux';
import FindPwdSecond from '../../components/find/FindPwdSecond';
import { useCallback, useState } from 'react';

const FindPwdSecondContainer = () => {
  const email = useSelector((state) => state.find.findPwd.email);
  const theme = useSelector((state) => state.theme.theme);

  const [selectedRadio, setSelectedRadio] = useState(email ? 'email' : 'phone');

  const radioChange = useCallback((e) => {
    setSelectedRadio(e.target.value);
  }, []);

  return (
    <>
      <FindPwdSecond selectedRadio={selectedRadio} radioChange={radioChange} theme={theme} email={email} />
    </>
  );
};

export default FindPwdSecondContainer;
