import React from 'react';
import { styled } from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBlock = styled.div`
  border: 1px solid blue;
  margin-top: 0.5rem;
`;
const StayledTag = styled.div`
  border: 1px solid green;
  display: inline-block;
  text-decoration: none;
  margin-right: 0.5rem;
  &:hover {
    color: ${palette.cyan[6]};
  }
`;

const Tag = ({ hashtags, handleTagClick }) => {
  return (
    <TagBlock>
      {hashtags &&
        hashtags.map((tag) => (
          <StayledTag key={tag} onClick={() => handleTagClick(tag)}>
            #{tag}
          </StayledTag>
        ))}
    </TagBlock>
  );
};

export default Tag;
