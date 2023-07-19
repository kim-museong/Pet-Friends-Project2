import FindPwdSecond from '../../components/find/FindPwdSecond';
import { useCallback, useState } from 'react';

const FindPwdSecondContainer = () => {
  const [selectedRadio, setSelectedRadio] = useState('email');

  const radioChange = useCallback((e) => {
    setSelectedRadio(e.target.value);
  }, []);

  return (
    <>
      <FindPwdSecond selectedRadio={selectedRadio} radioChange={radioChange} />
    </>
  );
};

export default FindPwdSecondContainer;
