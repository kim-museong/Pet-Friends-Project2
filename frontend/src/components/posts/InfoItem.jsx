import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineComment, AiFillHeart } from 'react-icons/ai';
import DomParser from 'dom-parser';
import { useNavigate } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const Wrapper = styled.div`
  width: 30%;
  margin: 15px;
  display: inline-block;

  .img {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 10px;
  }

  .infoContent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: ${({ theme }) => (theme === 'true' ? '' : ` 1px solid ${palette.border} `)};
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : ` white `)};
    padding: 20px;
    height: 390px;
  }
`;
const FirstBox = styled.div`
  width: 100%;
  align-items: center;
  padding: 10px 0;
  font-weight: bold;
  border-radius: 0;
  color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};

  & div:nth-child(2) {
    width: 600px;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const SecondBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  .content {
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: ${({ imageUrl }) => (imageUrl ? '3' : '10')}; /* 표시할 줄 수를 지정합니다 (원하는 줄 수 - 1) */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 0;
  }
`;
const ThirdBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ViewLike = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 16px;

  svg {
    font-size: 16px;
    margin: 0 5px;
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 8px;
    color: ${palette.mainColor};
  }

  div + div::before {
    content: '|';
    padding: 0 5px;
  }
`;

const NickDate = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;

  color: rgb(100, 100, 100);

  div + div::before {
    content: '|';
    padding: 0 5px;
  }
`;
const StyledSpan = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
`;

const InfoItem = ({ post, boardName, loading }) => {
  const theme = useSelector((state) => state.theme.theme);
  const navigator = useNavigate();

  const extractImageUrl = useCallback((content) => {
    const parser = new DomParser();
    const dom = parser.parseFromString(content, 'text/html');
    const imgTag = dom.getElementsByTagName('img')[0];

    if (imgTag) {
      return imgTag.getAttribute('src');
    }

    return null;
  }, []);

  if (!post) {
    return null;
  }
  const imageUrl = extractImageUrl(post.Content.content);

  const convertHTMLToText = (html) => {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(html, 'text/html');
    return parsedDocument.body.textContent || '';
  };

  const date = new Date(post.createdAt);
  const showDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

  const onClick = () => {
    navigator(`/${boardName}/${post.id}`);
  };

  return (
    <>
      <Wrapper theme={String(theme)}>
        <div className="infoContent" onClick={onClick}>
          {imageUrl && <div className="img" style={{ backgroundImage: `url(${imageUrl})` }}></div>}
          <div>
            {post && (
              <FirstBox theme={String(theme)}>
                <StyledSpan> {post.InfoDetail.title}</StyledSpan>
              </FirstBox>
            )}
          </div>

          <SecondBox imageUrl={imageUrl}>
            <div className="content">{convertHTMLToText(post.Content.content)}</div>
          </SecondBox>

          <ThirdBox>
            <ViewLike>
              <span>
                <AiOutlineEye /> {post.view}
              </span>
              <span>
                <AiFillHeart />
                {post && post.likeCount}
              </span>
            </ViewLike>

            <NickDate>
              <div>{post.User.nickname}</div>
              <div>{showDate}</div>
            </NickDate>
          </ThirdBox>
        </div>
      </Wrapper>
    </>
  );
};

export default InfoItem;
