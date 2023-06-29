import React from 'react';
import styled from 'styled-components';

const PictureItemBlock = styled.div`
  display: flex;
  border: 1px solid green;
  width: 150px;
  height: 200px;
  margin: 15px;
`;

const PictureItem = () => {
  return <PictureItemBlock>test</PictureItemBlock>;
};

export default PictureItem;
