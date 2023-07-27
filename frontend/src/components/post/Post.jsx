import React from 'react';
import { styled } from 'styled-components';
import { AiOutlineEye, AiOutlineComment, AiFillHeart } from 'react-icons/ai';

const PostBlock = styled.div`
  margin-top: 20px;
  border: 1px solid tomato;
  display: block;
  object-fit: cover;
  .test img {
    max-width: 100%;
  }
`;

const SecondBox = styled.div`
border: 1px solid rgb(186, 186, 186);
display: flex;
align-items: center;
font-size: 17px; 
& :nth-child(1) {
  margin-top: 5px;
  font-size: 16px;
  padding: 5px 20px;  
  }
  & :nth-child(2) {
  padding: 0 20px; 
  box-sizing: content-box; 
  }
  & :nth-child(3) {
    padding: 0 20px; 
    box-sizing: content-box; 
    }
    & :nth-child(4) {
    padding: 0 20px; 
    box-sizing: content-box; 
    } 
`;
const ThirdBox = styled.div`
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
  font-weight:bold;   
  margin: 10px 20px;     
`;

const Post = ({ post, likeCount, boardName }) => {
  if( !post ){
    return null;
  }
  const date = new Date(post.post.createdAt);
  const showDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  
  return (
    <PostBlock>
      {post && (               
        <>  
        <div>
          {boardName === 'community' ? (
            <StyledSpan>{`Title : ${post.post.CommunityDetail.title}`}</StyledSpan>
          ) : boardName === 'information' ? (
            <StyledSpan>{`Title : ${post.post.InfoDetail.title}`}</StyledSpan>
          ) : boardName === 'notice' ? (
            <StyledSpan>{`Title : ${post.post.NoticeDetail.title}`}</StyledSpan>
          ) : (
            '존재하지 않는 게시판'
          )}
          </div>
    <SecondBox>
      <div>{post.post.User.userId}</div>
      <div>작성일 : {showDate}</div>
    </SecondBox> 
    <ThirdBox> 
      <div className="test" dangerouslySetInnerHTML={{ __html: post.post.Content.content }} />
    </ThirdBox>
    <SecondBox>
      <div></div>
      <AiFillHeart style={{ color: 'rgb(255, 140, 0)' }}/> {likeCount}
      <AiOutlineEye style={{ color: 'rgb(255, 140, 0)' }}/> {post.post.view}
      <AiOutlineComment style={{ color: 'rgb(255, 140, 0)' }}/> {post.commentCount}
    </SecondBox>         
          </>  
      )}
    </PostBlock>
  );
};

export default React.memo(Post);
