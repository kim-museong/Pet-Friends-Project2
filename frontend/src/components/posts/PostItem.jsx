import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineComment, AiFillHeart } from 'react-icons/ai';
import palette from '../../lib/styles/palette';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const Wrapper = styled.div`
  width: 100%;
  margin: 15px 0;
  padding: 20px 10px;
  border-bottom: 1px solid ${palette.border};
  border-radius: 0;
  cursor: pointer;
`;
const FirstBox = styled.div`
  width: 100%;
  padding-bottom: 50px;
  font-weight: bold;
  color: ${({ theme }) => (theme === 'true' ? 'white' : 'rgb(50,50,50)')};
  & div:first-child {
    font-size: 30px;
    padding: 10px;
  }
  & div:nth-child(2) {
    font-size: 25px;
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
`;
const ThirdBox = styled.div`
  display: flex;
  align-items: center;
`;
const StyledSpan = styled.span`
  font-size: 25px;
`;

const LikeView = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  margin-right: 30px;

  div {
    margin-right: 10px;
  }

  svg {
    color: ${palette.mainColor};
  }
`;

const NickDate = styled.div`
  display: flex;
  align-items: center;

  div {
    font-size: 14px;
    color: rgb(100, 100, 100);
  }

  div + div::before {
    content: '|';
    padding: 0 5px;
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 20px;
    margin-right: 5px;
    padding-bottom: 1px;
  }
`;

const PostItem = ({ post, boardName }) => {
  const date = new Date(post.createdAt);
  const nav = useNavigate();
  const showDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  const theme = useSelector((state) => state.theme.theme);

  const onClick = useCallback(() => {
    nav(`/${boardName}/${post.id}`);
  }, [boardName, nav, post.id]);

  return (
    <>
      <Wrapper onClick={onClick}>
        <div>
          {post && (
            <FirstBox theme={String(theme)}>
              {boardName === 'community' ? (
                <StyledSpan>{`${post.CommunityDetail.title}`}</StyledSpan>
              ) : boardName === 'information' ? (
                <StyledSpan>{` ${post.InfoDetail.title}`}</StyledSpan>
              ) : boardName === 'notice' ? (
                <StyledSpan>{`${post.NoticeDetail.title}`}</StyledSpan>
              ) : (
                '존재하지 않는 게시판'
              )}
            </FirstBox>
          )}
        </div>
        <SecondBox>
          <ThirdBox>
            <LikeView>
              <FlexBox>
                <AiFillHeart />
                {post && post.likeCount}
              </FlexBox>
              <FlexBox>
                <AiOutlineEye /> {post.view}
              </FlexBox>
            </LikeView>

            <NickDate>
              <div>{post.User.nickname}</div>
              <div>{showDate}</div>
            </NickDate>
          </ThirdBox>
        </SecondBox>
      </Wrapper>
    </>
  );
};

export default PostItem;
