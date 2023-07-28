import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled, { css, keyframes } from 'styled-components';
import CommentInputContainer from '../../containers/comment/CommentInputContainer';
import palette from '../../lib/styles/palette';
import { formattedTime } from '../../lib/main/memo';
import { AiFillHeart } from 'react-icons/ai';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const CommentListBlock = styled.div`
  /* border: 1px solid greenyellow; */
  margin-top: 0.5rem;
`;

const CommentBlock = styled.div`
  border: 1px solid ${palette.border};
  margin: 0.5rem;
  padding: 10px;
  position: relative;

  animation: ${fadeIn} 0.5s ease-in-out;
  ${({ reply, theme }) =>
    reply === 'true' &&
    css`
      margin-left: 4rem;
      background: ${theme === 'true' ? 'rgb(45, 45, 45)' : 'rgb(245, 245, 245)'};
    `};
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const CommentContent = styled.div`
  padding: 0 1.5rem;
  margin: 0 0 10px;
  word-break: break-all; /* 자동 줄바꿈을 위해 추가 */
`;

const CommentNickname = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-right: 1rem;
`;

const PostUser = styled.div`
  font-size: 10px;
  padding: 3px 7px;
  border: 1px solid ${palette.mainColor};
  color: ${palette.mainColor};
  margin-left: 5px;
  margin-top: 3px;
`;

const CommentCreatedAt = styled.span`
  .date {
    font-size: 14px;
    color: rgb(100, 100, 100);
    margin-right: 20px;
  }
`;

const CommentDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

const CommentButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 10px;
  color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  margin-right: 15px;
  cursor: pointer;
  & + & {
    margin-left: 0.25rem;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const CommentButtonWrapper = styled.span`
  background-color: transparent;
  border-radius: 10px;
  padding: 0.5rem;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: ${palette.mainColor};
    margin-right: 5px;
    margin-top: 5px;
  }
`;

// comment/reply Component
const Comment = ({
  comment,
  loggedInUser,
  selectedCommentId,
  handleDeleteClick,
  handleReplyClick,
  handleLikeClick,
  handleUnlikeClick,
  isReply,
  setSelectedCommentId,
  latestComment,
  isLiked,
  postUser,
  theme,
}) => {
  console.log(postUser === comment.User.id);
  // scroll to new comment/reply
  useEffect(() => {
    if (latestComment.current && selectedCommentId === '') {
      latestComment.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [latestComment, selectedCommentId]);

  if (!comment) {
    return null;
  }
  return (
    <CommentBlock reply={isReply.toString()} ref={latestComment} theme={String(theme)}>
      {/* comment description + delete button */}
      <CommentHeader>
        <div>
          <CommentNickname>
            <div> {comment.User.nickname}</div>
            <div>{postUser === comment.UserId && <PostUser>작성자</PostUser>}</div>
          </CommentNickname>
        </div>
        {loggedInUser && loggedInUser.id === comment.UserId && !comment.deletedAt && (
          <CommentDeleteButton
            onClick={() => handleDeleteClick(isReply, comment.id, isReply ? comment.CommentId : null)}
          >
            <AiOutlineClose />
          </CommentDeleteButton>
        )}
      </CommentHeader>
      {/* comment content + reply button */}
      <CommentContent>
        {comment.deletedAt ? <span>{'삭제된 댓글입니다'}</span> : <span>{comment.content}</span>}
      </CommentContent>
      <div style={{ margin: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!comment.deletedAt && (
            <CommentCreatedAt>
              <>
                <FlexBox>
                  <div>
                    <AiFillHeart />
                  </div>
                  <div> {comment.likeCount}</div>
                </FlexBox>
              </>
            </CommentCreatedAt>
          )}
          {loggedInUser && !comment.deletedAt && (
            <CommentButtonWrapper>
              {isLiked(isReply, comment.id, loggedInUser?.id) ? (
                <CommentButton
                  theme={String(theme)}
                  onClick={() => handleUnlikeClick(loggedInUser.id, isReply ? 'reply' : 'comment', comment.id)}
                >
                  추천해제
                </CommentButton>
              ) : (
                <CommentButton
                  theme={String(theme)}
                  onClick={() => handleLikeClick(comment.id, isReply, loggedInUser.id)}
                >
                  추천
                </CommentButton>
              )}
            </CommentButtonWrapper>
          )}
          <CommentCreatedAt>
            <span className="date">{formattedTime(comment.createdAt)}</span>
          </CommentCreatedAt>
          <CommentButton theme={String(theme)} onClick={() => handleReplyClick(isReply, comment.id)}>
            {!comment.deletedAt && '답글쓰기'}
          </CommentButton>
        </div>
      </div>

      {/* comment input */}
      {selectedCommentId === comment.id && (
        <CommentInputContainer
          isReply={true}
          commentId={!isReply ? comment.id : comment.CommentId}
          setSelectedCommentId={setSelectedCommentId}
        ></CommentInputContainer>
      )}

      {/* reply list container */}
      {!isReply && (
        <CommentList
          comments={comment.Replies}
          loggedInUser={loggedInUser}
          selectedCommentId={selectedCommentId}
          handleDeleteClick={handleDeleteClick}
          handleReplyClick={handleReplyClick}
          handleLikeClick={handleLikeClick}
          handleUnlikeClick={handleUnlikeClick}
          isReply={true}
          setSelectedCommentId={setSelectedCommentId}
          latestComment={latestComment}
          isLiked={isLiked}
          postUser={postUser}
          theme={theme}
        ></CommentList>
      )}
    </CommentBlock>
  );
};

// comment list, reply list Component
const CommentList = ({
  comments,
  loggedInUser,
  selectedCommentId,
  handleDeleteClick,
  handleReplyClick,
  handleLikeClick,
  handleUnlikeClick,
  isReply = false,
  setSelectedCommentId,
  latestComment,
  isLiked,
  user,
  postUser,
  theme,
}) => {
  return (
    <CommentListBlock>
      {/* comment/reply list */}
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            loggedInUser={loggedInUser}
            selectedCommentId={selectedCommentId}
            handleDeleteClick={handleDeleteClick}
            handleReplyClick={handleReplyClick}
            handleLikeClick={handleLikeClick}
            handleUnlikeClick={handleUnlikeClick}
            isReply={isReply}
            setSelectedCommentId={setSelectedCommentId}
            latestComment={latestComment}
            isLiked={isLiked}
            user={user}
            postUser={postUser}
            theme={theme}
          ></Comment>
        ))}
    </CommentListBlock>
  );
};

export default CommentList;
