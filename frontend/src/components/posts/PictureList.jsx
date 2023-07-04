import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import PictureItem from './PictureItem';

const PictureListBlock = styled(Responsive)`
  margin-top: 3rem;
  border: 1px solid red;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PictureList = ({ posts, loading }) => {
  return (
    <PictureListBlock>
      {posts && posts.map((post) => <PictureItem key={post.id} post={post} loading={loading}></PictureItem>)}
    </PictureListBlock>
  );
};

export default PictureList;
