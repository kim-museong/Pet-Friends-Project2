import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoAsync } from '../../modules/main';
const DomParser = require('dom-parser');

const MainBox = styled.div`
  width: 100%;
  height: 344px;
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

const NotInfo = styled.div`
  width: 100%;
  padding: 20%;
  text-align: center;
  color: ${palette.border};
  font-size: 20px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')};
`;

const Info = () => {
  const info = useSelector((state) => state.main.info);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const extractImageUrl = useCallback((content) => {
    const parser = new DomParser();
    const dom = parser.parseFromString(content, 'text/html');
    const imgTag = dom.getElementsByTagName('img')[0];

    if (imgTag) {
      return imgTag.getAttribute('src');
    }

    return null;
  }, []);

  useEffect(() => {
    dispatch(getInfoAsync({ boardName: 'info', limit: '4' }));
  }, []);

  return (
    <>
      <MainBox theme={String(theme)}>
        <Title>정보글</Title>
        <Content>
          {info?.map((post) => (
            <InfoBox key={post.id}>
              <div className="img" style={{ backgroundImage: `url(${extractImageUrl(post.Content.content)})` }}></div>
              <div>
                <span className="info">정보글</span>
                <div className="title">{post.CommunityDetail.title}</div>
              </div>
            </InfoBox>
          ))}
          {info?.length === 0 && (
            <>
              <NotInfo theme={String(theme)}>
                <div>정보글이 없습니다.</div>
              </NotInfo>
            </>
          )}
        </Content>
      </MainBox>
    </>
  );
};

export default Info;
