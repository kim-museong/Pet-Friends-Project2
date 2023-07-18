import Event from '../../components/main/event';
import { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const AutoPlayMethods = () => {
  const sliderRef = useRef(null);
  const theme = useSelector((state) => state.theme.theme);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return <Event sliderRef={sliderRef} settings={settings} theme={theme} />;
};

export default AutoPlayMethods;
