import React from 'react';
import { styled } from 'styled-components';
import { AiOutlineEye, AiOutlineComment, AiFillHeart } from 'react-icons/ai';
import palette from '../../lib/styles/palette';
import { formattedTime } from '../../lib/main/memo';

import TagContainer from '../../containers/common/TagContainer';

const PostBlock = styled.div`
  margin-top: 20px;
  border: 1px solid ${palette.border};
  padding: 20px;
  display: block;
  object-fit: cover;
  .test img {
    max-width: 100%;
  }
`;

const SecondBox = styled.div`
  border: 1px solid ${palette.border};
  display: flex;
  align-items: center;
  padding: 10px 20px;

  .date {
    font-size: 14px;
    color: rgb(100, 100, 100);
  }

  div + div::before {
    content: '|';
    padding: 0 8px;
  }
`;
const ThirdBox = styled.div`
  min-height: 300px;
  height: auto;
  padding: 20px;
  margin-top: 10px;
  margin-right: 20px;
  div {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
  }
`;
const StyledSpan = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 10px 20px;
`;

const LikeViewComent = styled.div`
  display: flex;
  border-top: 1px solid ${palette.border};
  border-radius: 0;
  padding-top: 25px;
  font-size: 20px;

  svg {
    font-size: 24px;
    margin-right: 5px;
    color: ${palette.mainColor};
  }

  div {
    display: flex;
    margin-right: 10px;
  }
`;

const Post = ({ post, likeCount, boardName }) => {
  if (!post) {
    return null;
  }

  return (
    <PostBlock>
      {post && (
        <>
          <div>
            {boardName === 'community' ? (
              <StyledSpan>{`${post.post.CommunityDetail.title}`}</StyledSpan>
            ) : boardName === 'information' ? (
              <StyledSpan>{`${post.post.InfoDetail.title}`}</StyledSpan>
            ) : boardName === 'notice' ? (
              <StyledSpan>{` ${post.post.NoticeDetail.title}`}</StyledSpan>
            ) : (
              '존재하지 않는 게시판'
            )}
          </div>

          <SecondBox>
            <div className="user">{post.post.User.userId}</div>
            <div className="date">{formattedTime(post.post.createdAt)}</div>
          </SecondBox>

          <ThirdBox>
            <div className="test" dangerouslySetInnerHTML={{ __html: post.post.Content.content }} />
          </ThirdBox>

          <LikeViewComent>
            <div>
              <div>
                <AiFillHeart /> {likeCount}
              </div>
              <div>
                <AiOutlineEye /> {post.post.view}
              </div>
              <div>
                <AiOutlineComment /> {post.commentCount}
              </div>
            </div>
          </LikeViewComent>

          <TagContainer />
        </>
      )}
    </PostBlock>
  );
};

export default React.memo(Post);
