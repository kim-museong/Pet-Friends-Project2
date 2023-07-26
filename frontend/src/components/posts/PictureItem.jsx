import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5';
import { FiEdit3, FiX } from 'react-icons/fi';
import palette from '../../lib/styles/palette';

const PictureItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: 1px solid green;
  width: 150px;
  height: 200px;
  margin: 0;
  // ↓ 나중에 수정
  ${({ imgurl }) =>
    imgurl &&
    css`
      background-image: url('${imgurl}');
      background-size: cover;
      background-position: center;
    `}
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.15);
  }
  /* position: releative; */
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: auto;
  margin-bottom: 0.25rem;
  margin-right: 0.25rem;
  color: ${palette.mainColor};
  & > * {
    margin-left: 5px;
  }
`;
const IoHeartSharpBlock = styled(IoHeartSharp)`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
const IoHeartOutlineBlock = styled(IoHeartOutline)`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const FiEdit3Block = styled(FiEdit3)`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
const FiXBlock = styled(FiX)`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Wrapper = styled.div`
  margin: 15px;
`;

const handleIconClick = (event) => {
  event.preventDefault();
  console.log(`${event.target.dataset.icon} 클릭됨`);
};

const PictureItem = ({ post, user, likes, loading }) => {
  console.log(user.id, post.id);
  const isLiked = () => {
    return likes?.some(
      (like) => like.UserId === user.id && like.likable_type === 'post' && like.likable_id.toString() === post.id,
    );
  };

  return (
    <>
      <Wrapper>
        <Link to={`/picture/${post.id}`}>
          <PictureItemBlock imgurl={post && post.PictureDetail.imgUrl}>
            {user && (
              <ButtonWrapper>
                {isLiked().toString()}
                {isLiked() ? (
                  <IoHeartSharpBlock data-icon="fullLikeIcon" onClick={handleIconClick} />
                ) : (
                  <IoHeartOutlineBlock data-icon="emptyLikeIcon" onClick={handleIconClick} />
                )}
                {user.id === post.UserId && (
                  <>
                    <FiEdit3Block data-icon="editIcon" nClick={handleIconClick} />
                    <FiXBlock data-icon="deleteIcon" onClick={handleIconClick} />
                  </>
                )}
              </ButtonWrapper>
            )}
          </PictureItemBlock>
        </Link>
      </Wrapper>
    </>
  );
};

export default PictureItem;
