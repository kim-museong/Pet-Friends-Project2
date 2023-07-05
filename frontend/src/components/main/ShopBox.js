import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ShopShowBox = styled.div`
  border: 1px solid rgb(186, 186, 186);
  margin-right: 20px;
  padding: 10px 0;
  .slick-prev:before,
  .slick-next:before {
    content: '';
  }

  div h3 {
    width: 300px;
    height: 200px;
    border: 1px solid rgb(186, 186, 186);
  }

  .slick-slider {
    margin-left: 35px;
  }

  .slick-dots {
    bottom: -40px;
  }
`;

const ShopBox = () => {
  const theme = useSelector((state) => state.theme.theme);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <ShopShowBox theme={String(theme)}>
        <Slider {...settings}>
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
      </ShopShowBox>
    </>
  );
};

export default ShopBox;
