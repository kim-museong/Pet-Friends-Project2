import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { getMainAsync } from '../../modules/main';

const NewTickerBox = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 2px 1px ${palette.border}`)};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
`;

const ShowBox = styled.div`
  width: 300px;
  height: 35px;
  margin: 0 auto;
  overflow: hidden;

  .rolling {
    padding-top: 2px;

    .title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .mark {
    width: 90px;
    padding: 5px 10px;
    margin-right: 15px;
    text-align: center;
    font-size: 12px;
    color: white;
    font-weight: bold;
    background: rgba(256, 0, 0, 0.7);
  }

  .notice {
    display: flex;
    align-items: center;
    padding: 2px 5px;
    margin-bottom: 10px;

    div {
      padding-bottom: 2px;
    }
  }
`;

const NotNotic = styled.div`
  margin-top: 3px;
  color: ${palette.border};
  text-align: center;
`;

const NewsTicker = () => {
  const rollingRef = useRef();
  const posts = useSelector((state) => state.main.posts);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  console.log(posts);

  useEffect(() => {
    dispatch(getMainAsync({ boardName: 'notice', limit: '5' }));
  }, []);

  useEffect(() => {
    const rollingElement = rollingRef.current;
    if (rollingElement && rollingElement.firstElementChild) {
      const interval = setInterval(() => {
        const firstChild = rollingElement.firstElementChild;
        rollingElement.style.transitionDuration = '400ms';
        rollingElement.style.marginTop = '-41px';
        setTimeout(() => {
          rollingElement.removeAttribute('style');
          const clonedFirstChild = firstChild.cloneNode(true);
          ReactDOM.unstable_batchedUpdates(() => {
            rollingElement.appendChild(clonedFirstChild);
            rollingElement.removeChild(firstChild);
          });
        }, 400);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [posts]);


  return (
    <>
      <NewTickerBox theme={String(theme)}>
        <ShowBox>
          <div className="rolling" ref={rollingRef}>
            {posts?.map((post, index) => (
              <div key={index} className="notice">
                <span className="mark">공지사항</span>
                <div className="title">{post.CommunityDetail?.title}</div>
              </div>
            ))}
            {posts?.length === 0 && (
              <>
                <NotNotic>
                  <div>공지사항이 없습니다.</div>
                </NotNotic>
              </>
            )}
          </div>
        </ShowBox>
      </NewTickerBox>
    </>
  );
};

export default React.memo(NewsTicker);
