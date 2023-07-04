import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comments from '../components/post/Comments';
import ActionButtonContainer from '../containers/common/ActionButtonContainer';
import TagContainer from '../containers/common/TagContainer';
import PictureContainer from '../containers/post/PictureContainer';
import PostContainer from '../containers/post/PostContainer';
import SubmitCommentContainer from '../containers/post/SubmitCommentContainer';

const PostDetailPage = () => {
  const location = useLocation();
  const params = useParams();
  const postId = params.postId;
  const boardName = location.pathname.split('/')[1];
  // 사진글 상세 정보 페이지, 나머지 게시글 상세 정보 페이지 구분
  return (
    <>
      {boardName === 'picture' ? (
        <>
          <PictureContainer postId={postId} />
          <TagContainer />
          <ActionButtonContainer />
          <SubmitCommentContainer />
          <Comments />
        </>
      ) : (
        <>
          <PostContainer />
          <TagContainer />
          <ActionButtonContainer />
          <SubmitCommentContainer />
          <Comments />
        </>
      )}
    </>
  );
};

export default PostDetailPage;
