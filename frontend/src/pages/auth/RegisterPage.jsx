import { useSelector } from '../../../node_modules/react-redux/es/exports';
import RegisterStep from '../../components/common/RegisterStep';
import AgreeContainer from '../../containers/auth/register/AgreeContainer';
import RegisterContainer from '../../containers/auth/register/RegisterContainer';
import RegisterfirstContainer from '../../containers/auth/register/RegisterfirstContainer';

const RegisterPage = () => {
  const step = useSelector((state) => state.auth.register.step);
  return (
    <>
      <RegisterStep />
      {step === 1 && <AgreeContainer />}
      {step === 2 && <RegisterfirstContainer />}
      {step === 3 && <RegisterContainer />}
    </>
  );
};

export default RegisterPage;
