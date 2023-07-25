import React from 'react';
import styled from 'styled-components';
import KakaoMap from '../api/KakaoMap';
import Overlay from '../common/Overlay';
import Responsive from '../common/Responsive';
import PostItem from './PostItem';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
  border: 1px solid red;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PostList = ({ posts, boardName, loading }) => {
  return (
    <>
      {/* 로딩중...  로딩시간이 너무 짧아서 깜빡거리기만 하기 때문에 아예 빼는것도 고려 */}
      {/* {loading && <Overlay></Overlay>} */}
      {!loading && (
        <PostListBlock>
          {posts && posts.map((post) => <PostItem key={post.id} post={post} boardName={boardName}></PostItem>)}
          <KakaoMap></KakaoMap>
        </PostListBlock>
      )}
    </>
  );
};

export default PostList;
