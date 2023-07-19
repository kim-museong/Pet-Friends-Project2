import { useSelector } from '../../../node_modules/react-redux/es/exports';
import Random from '../../components/main/Random';

const RandomContainer = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      <Random theme={theme} />
    </>
  );
};

export default RandomContainer;
