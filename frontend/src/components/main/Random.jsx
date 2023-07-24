import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { GiCardRandom } from 'react-icons/gi';

const RandomBox = styled.div`
  width: 100%;
  height: 520px;
  margin: 20px 0;
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  text-align: center;
`;

const RandomTitle = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: ${palette.mainColor};
  padding: 20px;
`;

const RandomMain = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px auto;
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }

  div {
    display: inline-block;
    width: 300px;
    height: 300px;
    color: ${palette.border};
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
    svg {
      margin-top: 50px;
      font-size: 150px;
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    margin-bottom: 20px;
    border: none;
    background: ${palette.mainColor};
    color: white;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      background: ${palette.border};
    }
  }
`;

const Random = ({ theme, fetchRandomCatImage, fetchRandomDogImage, catImage, dogImage }) => {
  return (
    <>
      <RandomBox theme={String(theme)}>
        <RandomTitle> 랜덤 사진</RandomTitle>
        <hr />
        <RandomMain theme={String(theme)}>
          {catImage && <img src={catImage} alt="Random Cat" />}
          {dogImage && <img src={dogImage} alt="Random Dog" />}
          {!catImage && !dogImage && (
            <div>
              <GiCardRandom />
              <p>버튼을 눌러서 이미지를 불러오세요!</p>
            </div>
          )}
        </RandomMain>
        <hr />
        <BtnBox>
          <button onClick={fetchRandomCatImage}>고양이</button>
          <button onClick={fetchRandomDogImage}>강아지</button>
        </BtnBox>
      </RandomBox>
    </>
  );
};

export default Random;
