import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ActionButton from '../../components/post/ActionButton';
import { deletePost } from '../../lib/api/post';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addLike, deleteLike, getLikes } from '../../modules/like';
import { useEffect } from 'react';

const ActionButtonContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const postId = params.postId;
  const boardName = location.pathname.split('/')[1];

  const post = useSelector((state) => state.post.post);
  const user = useSelector((state) => state.user.user);
  const likes = useSelector((state) => state.like.likes);

  const dispatch = useDispatch();

  // boardName, postId 필요
  const onDelete = async () => {
    try {
      await deletePost({ boardName, postId });
      navigate(-1);
    } catch (error) {
      // post 삭제 실패
      // 추후 삭제 실패 모달로 대체
      console.log(error);
    }
  };

  // 현재 post 추천 여부 체크
  const isLiked = () => {
    return likes?.some(
      (like) => like.UserId === user?.id && like.likable_type === 'post' && like.likable_id.toString() === postId,
    );
  };

  const onLike = () => {
    console.log('추천 버튼 클릭');
    dispatch(
      addLike({
        userId: user.id,
        postId,
        targetType: 'post',
        targetId: postId,
      }),
    );
  };

  const handleUnlikeClick = () => {
    console.log('추천 해제 버튼 클릭');
    dispatch(
      deleteLike({
        userId: user.id,
        targetType: 'post',
        targetId: postId,
        postId,
      }),
    );
  };

  useEffect(() => {
    if (user && postId) {
      console.log('getLikes 요청 보냄', user, postId);
      // dispatch(getLikes({ userId: user.id, postId }));
    }
  }, [post]);

  return (
    <ActionButton
      onDelete={onDelete}
      onLike={onLike}
      handleUnlikeClick={handleUnlikeClick}
      post={post}
      user={user}
      boardName={boardName}
      isLiked={isLiked}
    ></ActionButton>
  );
};

export default ActionButtonContainer;
