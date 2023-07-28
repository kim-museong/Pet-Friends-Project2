import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5';
import { FiEdit3, FiX } from 'react-icons/fi';
import palette from '../../lib/styles/palette';
import { addLike, getLikes } from '../../modules/like';
import { useDispatch } from 'react-redux';

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
  width: 100%;
  height: 15%;
  border-radius: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  color: ${palette.mainColor};
  background: rgba(1, 149, 168, 0.2);
  & > * {
    margin-left: 5px;
  }
`;
const IoHeartSharpBlock = styled(IoHeartSharp)`
  border-radius: 0;
  width: 25px;
  height: 25px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
const IoHeartOutlineBlock = styled(IoHeartOutline)`
  border-radius: 0;
  width: 25px;
  height: 25px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const FiEdit3Block = styled(FiEdit3)`
  border-radius: 0;
  width: 25px;
  height: 25px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
const FiXBlock = styled(FiX)`
  border-radius: 0;
  width: 25px;
  height: 25px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Wrapper = styled.div`
  margin: 15px;
`;

const PictureItem = ({ post, user, likes, loading }) => {
  const dispatch = useDispatch();

  const handleIconClick = (event) => {
    event.preventDefault();
    console.log(`${event.target.dataset.icon} 클릭됨`);
    dispatch(
      addLike({
        userId: user.id,
        postId: post.id,
        targetType: 'post',
        targetId: post.id,
      }),
    );
    // TODO : likes 늦게 갱신 되는거 해결
    dispatch(getLikes({ userId: user?.id }));
  };
  const isLiked = () => {
    return (
      likes &&
      likes.some((like) => like.UserId === user.id && like.likable_type === 'post' && like.likable_id === post.id)
    );
  };

  return (
    <>
      <Wrapper>
        <Link to={`/picture/${post.id}`}>
          <PictureItemBlock imgurl={post && post.PictureDetail.imgUrl}>
            {user && (
              <ButtonWrapper>
                {likes && isLiked() ? (
                  <IoHeartSharpBlock data-icon="fullLikeIcon" onClick={handleIconClick} />
                ) : (
                  <IoHeartOutlineBlock data-icon="emptyLikeIcon" onClick={handleIconClick} />
                )}
                {user.id === post.UserId && (
                  <>
                    <FiEdit3Block data-icon="editIcon" onClick={handleIconClick} />
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
