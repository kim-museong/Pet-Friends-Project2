import { useSelector } from 'react-redux';
import FindPwdSecond from '../../components/find/FindPwdSecond';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { initialize } from '../../modules/find';

const FindPwdSecondContainer = () => {
  const email = useSelector((state) => state.find.findPwd.findUser?.email);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const [selectedRadio, setSelectedRadio] = useState(email ? 'email' : 'phone');

  const radioChange = useCallback(
    (e) => {
      setSelectedRadio(e.target.value);
      dispatch(initialize('certificationNumber'));
    },
    [dispatch],
  );

  return (
    <>
      <FindPwdSecond selectedRadio={selectedRadio} radioChange={radioChange} theme={theme} email={email} />
    </>
  );
};

export default FindPwdSecondContainer;
