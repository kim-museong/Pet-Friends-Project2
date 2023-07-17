import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useNavigate } from 'react-router-dom';

const CarouselBox = styled.div`
  margin-right: 20px;
  box-shadow: 0 0 0 1px ${palette.border};

  h3 {
    width: 100%;
    height: 150px;

    border-radius: 0;
  }
  .slick-prev:before,
  .slick-next:before {
    content: '';
  }

  .slick-dots {
    bottom: 10px;
  }

  .attend {
    background-image: url('../../../images/attend.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 50%; /* 이미지를 가로로 50% 위치로 이동 */
    cursor: pointer;
  }
`;

export const Event = ({ sliderRef, settings }) => {
  const navigate = useNavigate();
  const onAttendancePage = () => {
    navigate('/attendance'); // 이동할 주소를 지정합니다.
  };

  return (
    <CarouselBox>
      <Slider ref={sliderRef} {...settings}>
        <div>
          <h3 className="attend" onClick={onAttendancePage}>
            <a href="https://kor.pngtree.com/freepng/korean-yellow-time-attendance-punch-card-style_6590218.html">
              출처
            </a>
          </h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </CarouselBox>
  );
};

export default Event;
