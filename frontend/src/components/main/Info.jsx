import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { changeDate } from '../../lib/main/memo';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DomParser from 'dom-parser';
import { getInfoAsync } from '../../modules/main';
import { MdChevronRight } from 'react-icons/md';
import { CgComment } from 'react-icons/cg';

const MainBox = styled.div`
  width: 100%;
  height: 330px;
  margin-top: 10px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  padding: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  .more {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 10px;
    color: ${({ theme }) => (theme === 'true' ? `white` : 'rgb(50, 50, 50)')};

    svg {
      margin-right: 5px;
      color: ${palette.mainColor};
      font-size: 12px;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    margin-right: 10px;
    font-size: 20px;
    color: rgb(0, 100, 256);
  }

  .subTitle {
    font-size: 18px;
  }

  .title {
    font-weight: bold;
    font-size: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 10px;
`;

const InfoBox = styled.div`
  width: 49%;
  display: flex;
  margin: 5px auto;

  .img {
    width: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 10px;
  }

  .title {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    overflow: hidden;
    border-radius: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .body {
    font-size: 12px;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 표시할 줄 수를 지정합니다 (원하는 줄 수 - 1) */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .infoBox {
    width: 60px;
    border: none;
    background: rgb(0, 100, 256);
    padding: 5px 10px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .date {
    font-size: 11px;
    text-align: left;

    .user {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    a + span::before {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      content: '|';
    }
  }
`;

const InfoContent = styled.div`
  width: ${({ imageUrl }) => (imageUrl === 'null' ? '100%' : ' 52%')};
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NotInfo = styled.div`
  color: ${palette.border};
  font-size: 20px;
  margin-top: 8rem;
  margin-left: 40%;
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

  //  html 텍스트로 바꿈
  const convertHTMLToText = (html) => {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(html, 'text/html');
    return parsedDocument.body.textContent || '';
  };

  useEffect(() => {
    dispatch(getInfoAsync({ boardName: 'information', limit: '4' }));
  }, [dispatch]);

  return (
    <>
      <Title theme={String(theme)}>
        <div style={{ display: 'flex' }}>
          <CgComment />
          <div>
            <span className="subTitle">알아두면 유용한 반려동물 지식 , </span>
            <span className="title">정보글</span>
          </div>
        </div>
        <div className="more">
          <Link to="/information">더보기</Link>
          <MdChevronRight />
        </div>
      </Title>
      <MainBox theme={String(theme)}>
        <Content>
          {info === null || info?.length === 0 ? (
            <>
              <NotInfo theme={String(theme)}>
                <div>정보글이 없습니다.</div>
              </NotInfo>
            </>
          ) : (
            <>
              {info?.map((post) => {
                const imageUrl = extractImageUrl(post.Content.content);
                return (
                  <InfoBox key={post.id} theme={String(theme)}>
                    {imageUrl && <div className="img" style={{ backgroundImage: `url(${imageUrl})` }}></div>}
                    <InfoContent imageUrl={String(imageUrl)}>
                      <div>
                        <span className="infoBox">정보글</span>
                        <Link to={`/${post.Board.name}/${post.id}`} className="title">
                          {post.InfoDetail.title}
                        </Link>
                        <div className="body">{convertHTMLToText(post.Content.content)}</div>
                      </div>

                      <div className="date">
                        <Link to={`/mypage/${post.User.userId}`} className="user">
                          {post.User.nickname}
                        </Link>
                        <span>{changeDate(post.createdAt)}</span>
                      </div>
                    </InfoContent>
                  </InfoBox>
                );
              })}
            </>
          )}
        </Content>
      </MainBox>
    </>
  );
};

export default Info;
