import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const CarouselBox = styled.div`
  margin-right: 20px;

  h3 {
    width: 100%;
    height: 300px;
    background: rgba(256, 90, 0);

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
  }
`;

export const Event = ({ sliderRef, settings }) => {
  return (
    <CarouselBox>
      <Slider ref={sliderRef} {...settings}>
        <div>
          <h3 className="attend">
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
