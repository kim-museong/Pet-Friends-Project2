import React from 'react';
import { styled } from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBlock = styled.div`
  margin-top: 20px;
  padding: 10px;
`;
const StayledTag = styled.div`
  display: inline-block;
  text-decoration: none;
  margin-right: 0.5rem;
  border-radius: 20px;
  border: 1px solid ${palette.mainColor};
  color: ${palette.mainColor};
  padding: 10px 20px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
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
