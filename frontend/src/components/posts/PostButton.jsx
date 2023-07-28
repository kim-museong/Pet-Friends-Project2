import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const ButtonBox = styled.div`
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid ${palette.border};
  border-radius: 0;
  text-align: right;

  a {
    margin-right: 25rem;
  }
`;

const WriteBtn = styled(Button)`
  padding: 8px 40px;
`;

const PostButton = ({ boardName, user }) => {
  return (
    <>
      <ButtonBox>
        {boardName === 'notice' ? (
          <Link to="/editor/post" state={{ boardName }}>
            {user && user.rank === 'admin' && <WriteBtn>글쓰기</WriteBtn>}
          </Link>
        ) : (
          <Link to="/editor/post" state={{ boardName }}>
            {user && <WriteBtn>글쓰기</WriteBtn>}
          </Link>
        )}
      </ButtonBox>
    </>
  );
};

export default PostButton;
