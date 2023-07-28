import { useSelector } from 'react-redux';
import RegisterStep from '../../components/common/RegisterStep';
import AgreeContainer from '../../containers/auth/register/AgreeContainer';
import RegisterContainer from '../../containers/auth/register/RegisterContainer';
import RegisterfirstContainer from '../../containers/auth/register/RegisterfirstContainer';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
  const step = useSelector((state) => state.auth.register.step);
  return (
    <>
      <Helmet>
        <title>펫프렌즈 - 회원가입</title>
      </Helmet>
      <RegisterStep />
      {step === 3 && <RegisterContainer />}
      {step === 2 && <RegisterfirstContainer />}
      {step === 1 && <AgreeContainer />}
    </>
  );
};

export default RegisterPage;
