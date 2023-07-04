import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const CarouselBox = styled.div`
  margin-right: 20px;

  h3 {
    width: 100%;
    height: 300px;
    background: gray;
    border-radius: 0;
  }
  .slick-prev:before,
  .slick-next:before {
    content: '';
  }

  .slick-dots {
    bottom: 10px;
  }
`;

export const Event = ({ sliderRef, settings }) => {
  return (
    <CarouselBox>
      <Slider ref={sliderRef} {...settings}>
        <div>
          <h3>1</h3>
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
