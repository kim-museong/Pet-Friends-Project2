import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import AlertModal from '../common/AlertModal';

import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5';
import { FiEdit3, FiX } from 'react-icons/fi';
import palette from '../../lib/styles/palette';
import { addLike, deleteLike, getLikes } from '../../modules/like';
import { useDispatch } from 'react-redux';
import { storeOriginPost } from '../../modules/write';
import { deletePost } from '../../lib/api/post';
import { getPostsAsync } from '../../modules/posts';

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
    margin-right: 5px;
  }
`;
const IoHeartSharpBlock = styled(IoHeartSharp)`
  border-radius: 0;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
const IoHeartOutlineBlock = styled(IoHeartOutline)`
  border-radius: 0;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const FiEdit3Block = styled(FiEdit3)`
  border-radius: 0;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
const FiXBlock = styled(FiX)`
  border-radius: 0;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Wrapper = styled.div`
  margin: 15px;
`;

const PictureItem = ({ post, user, likes, onUpdate, onDelete, loading }) => {
  const dispatch = useDispatch();

  const modalRef = useRef(null);
  const [visible, setVisible] = useState(false); // for model on-off
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: null,
    onCancel: null,
  });

  // modal창의 수정 버튼
  const onModalUpdateClick = () => {
    setVisible(false);
    onUpdate(post);
  };

  // modal창의 삭제 버튼
  const onModalDeleteClick = () => {
    setVisible(false);
    onDelete(post);
  };

  // modal창의 취소 버튼
  const onModalCancelClick = () => {
    setVisible(false);
  };

  // modal창이 떴을 때 클릭 이벤트
  const onModalOutSideClick = (event) => {
    // target과 currentTarget이 같을 때 모달창 꺼짐(=모달창 외부 클릭)
    if (modalRef.current === event.target) {
      setVisible(false);
    }
  };

  const findDataIcon = (element) => {
    while (element) {
      if (element.dataset.icon) {
        return element.dataset.icon;
      }
      element = element.parentElement;
    }
    return null;
  };

  const handleIconClick = (event) => {
    event.preventDefault();
    const dataIcon = findDataIcon(event.target);
    console.log(dataIcon);
    console.log(`${dataIcon} 클릭됨`);
    switch (dataIcon) {
      case 'fullLikeIcon':
        dispatch(
          deleteLike({
            userId: user.id,
            targetType: 'post',
            targetId: post.id,
            postId: post.id,
          }),
        );
        break;
      case 'emptyLikeIcon':
        dispatch(
          addLike({
            userId: user.id,
            postId: post.id,
            targetType: 'post',
            targetId: post.id,
          }),
        );
        break;
      case 'editIcon':
        setModalData({
          title: '사진 정보 수정',
          description: '사진 정보를 수정하시겠습니까?',
          confirmText: '수정',
          cancelText: '취소',
          onConfirm: onModalUpdateClick,
          onCancel: onModalCancelClick,
        });
        setVisible(true);
        break;
      case 'deleteIcon':
        setModalData({
          title: '사진 정보 삭제',
          description: '사진 정보를 삭제하시겠습니까?',
          confirmText: '삭제',
          cancelText: '취소',
          onConfirm: onModalDeleteClick,
          onCancel: onModalCancelClick,
        });
        setVisible(true);
        break;
      default:
        break;
    }
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
      <AlertModal
        modalRef={modalRef}
        visible={visible}
        modalData={modalData}
        onModalOutSideClick={onModalOutSideClick}
      ></AlertModal>
    </>
  );
};

export default PictureItem;
