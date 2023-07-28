import React from 'react';
import styled from 'styled-components';
import RandomDog from '../api/RandomDog';
import Overlay from '../common/Overlay';
import Responsive from '../common/Responsive';
import PostItem from './PostItem';
import InfoItem from './InfoItem';

const PostListBlock = styled(Responsive)`
  width: 50%;
  margin: 20px auto;
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const InfoListBlock = styled.div`
  width: 60%;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
`;
const PostList = ({ posts, boardName, loading }) => {
  return (
    <>
      {/* 로딩중...  로딩시간이 너무 짧아서 깜빡거리기만 하기 때문에 아예 빼는것도 고려 */}
      {/* {loading && <Overlay></Overlay>} */}
      {!loading ? (
        <>
          {boardName === 'information' ? (
            <>
              <InfoListBlock>
                {posts && posts.map((post) => <InfoItem key={post.id} post={post} boardName={boardName}></InfoItem>)}
              </InfoListBlock>
            </>
          ) : (
            <PostListBlock>
              {posts && posts.map((post) => <PostItem key={post.id} post={post} boardName={boardName}></PostItem>)}
            </PostListBlock>
          )}
        </>
      ) : (
        <>
          : (
          <>
            <div style={{ width: '60%', height: '1300px' }}></div>
          </>
          )
        </>
      )}
    </>
  );
};

export default PostList;
