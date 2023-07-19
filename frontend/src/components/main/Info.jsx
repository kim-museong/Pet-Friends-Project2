import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoAsync } from '../../modules/main';
const DomParser = require('dom-parser');

const MainBox = styled.div`
  width: 100%;
  margin-top: 20px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  padding: 20px 40px;
`;

const Title = styled.div`
  margin-bottom: 20px;
  padding: 5px 30px 10px;
  font-size: 20px;
  border-radius: 4px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const InfoBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .img {
    width: 150px;
    height: 100px;
    border: 1px solid ${palette.border};
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 15px;
  }

  .title {
    width: 200px;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .info {
    border: none;
    background: rgb(0, 100, 256);
    padding: 5px 10px;
    color: white;
    font-size: 12px;
  }
`;

const Info = () => {
  const info = useSelector((state) => state.main.info);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { posts } = info || '';

  const extractImageUrl = useCallback((content) => {
    const parser = new DomParser();
    const dom = parser.parseFromString(content, 'text/html'); // content를 HTML DOM으로 파싱합니다.
    const imgTag = dom.getElementsByTagName('img')[0]; // 첫 번째 이미지 태그를 가져옵니다.

    if (imgTag) {
      return imgTag.getAttribute('src'); // 이미지 태그의 src 속성 값을 반환합니다.
    }

    return null; // 이미지 태그가 없으면 null을 반환합니다.
  }, []);

  useEffect(() => {
    dispatch(getInfoAsync({ boardName: 'info', limit: '4' }));
  }, []);

  return (
    <>
      <MainBox theme={String(theme)}>
        <Title>정보글</Title>
        <Content>
          {posts?.map((info) => (
            <InfoBox key={info.id}>
              <div className="img" style={{ backgroundImage: `url(${extractImageUrl(info.Content.content)})` }}></div>
              <div>
                <span className="info">정보글</span>
                <div className="title">{info.title}</div>
              </div>
            </InfoBox>
          ))}
        </Content>
      </MainBox>
    </>
  );
};

export default Info;
