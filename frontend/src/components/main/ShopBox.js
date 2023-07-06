import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ShopShowBox = styled.div`
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

  .img {
    background-image: url('../../images/dogeat.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 75%; /* 이미지를 가로로 50% 위치로 이동 */
  }

  .img1 {
    background-image: url('../../images/dogbead.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 75%; /* 이미지를 가로로 50% 위치로 이동 */
  }

  .img2 {
    background-image: url('../../images/catcage.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 10% 70%; /* 이미지를 가로로 50% 위치로 이동 */
  }
`;

const ShopBox = () => {
  const theme = useSelector((state) => state.theme.theme);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  // 출처 <a href="https://kr.freepik.com/free-photo/domestic-pet-food-composition_14603263.htm#page=2&query=%EA%B0%95%EC%95%84%EC%A7%80%20%EC%9A%A9%ED%92%88&position=26&from_view=keyword&track=ais">Freepik</a>

  return (
    <>
      <ShopShowBox theme={String(theme)}>
        <Slider {...settings}>
          <div>
            <h3 className="img">
              출처
              <a href="https://kr.freepik.com/free-photo/domestic-pet-food-composition_14603263.htm#page=2&query=%EA%B0%95%EC%95%84%EC%A7%80%20%EC%9A%A9%ED%92%88&position=26&from_view=keyword&track=ais">
                Freepik
              </a>
            </h3>
          </div>
          <div>
            <h3 className="img1">
              출처
              <a href="https://kr.freepik.com/free-photo/adorable-white-little-puppy_14724886.htm#page=4&query=%EA%B0%95%EC%95%84%EC%A7%80%20%EC%9A%A9%ED%92%88&position=32&from_view=keyword&track=ais">
                Freepik
              </a>
            </h3>
          </div>
          <div>
            <h3 className="img2">
              출처
              <a href="https://kr.freepik.com/free-photo/beautiful-pet-portrait-of-cat_21249196.htm#query=%EA%B3%A0%EC%96%91%EC%9D%B4%20%EC%9A%A9%ED%92%88&position=28&from_view=search&track=ais">
                Freepik
              </a>
            </h3>
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
