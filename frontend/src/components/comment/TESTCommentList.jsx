import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowReturnRight } from 'react-icons/bs';
import styled, { css } from 'styled-components';
import TESTCommentInputContainer from '../../containers/comment/TESTCommentInputContainer';

const CommentListBlock = styled.div`
  /* border: 1px solid greenyellow; */
  margin-top: 0.5rem;
`;

const CommentBlock = styled.div`
  border: 1px solid grey;
  margin: 0.5rem;
  position: relative;
  ${(props) =>
    props.isreply &&
    css`
      margin: 0px;
      margin-left: 5rem;
    `};
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const CommentContent = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  padding: 1.5rem;
  word-break: break-all; /* 자동 줄바꿈을 위해 추가 */
`;

const CommentNickname = styled.span`
  font-weight: bold;
  margin-right: 1rem;
`;

const CommentCreatedAt = styled.span`
  margin-right: 1rem;
`;

const CommentDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

const CommentReplyButton = styled.button`
  margin-left: auto;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 10px;
  padding: 0.5rem;
  cursor: pointer;
`;

const ArrowIcon = styled(BsArrowReturnRight)`
  position: absolute;
  top: 50%;
  left: -4rem;
  transform: translateY(-50%);
  font-size: 3rem;
`;

const TESTComment = ({
  comment,
  loggedInUser,
  selectedCommentId,
  handleDeleteClick,
  handleReplyClick,
  isReply,
  setSelectedCommentId,
}) => {
  if (!comment) {
    return null;
  }
  return (
    <CommentBlock isreply={isReply}>
      {isReply && <ArrowIcon />} {/* 아이콘 추가 */}
      {/* comment description + delete button */}
      <CommentHeader>
        <div>
          <CommentNickname>{comment.User.nickname}</CommentNickname>
          <CommentCreatedAt>{comment.createdAt}</CommentCreatedAt>
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
        {loggedInUser && !comment.deletedAt && (
          <CommentReplyButton onClick={() => handleReplyClick(isReply, comment.id)}>대댓글</CommentReplyButton>
        )}
      </CommentContent>
      {/* comment input */}
      {selectedCommentId === comment.id && (
        <TESTCommentInputContainer
          isReply={true}
          commentId={!isReply ? comment.id : comment.CommentId}
          setSelectedCommentId={setSelectedCommentId}
        ></TESTCommentInputContainer>
      )}
      {/* reply list container */}
      {!isReply && (
        <TESTCommentList
          comments={comment.Replies}
          loggedInUser={loggedInUser}
          selectedCommentId={selectedCommentId}
          handleDeleteClick={handleDeleteClick}
          handleReplyClick={handleReplyClick}
          isReply={true}
          setSelectedCommentId={setSelectedCommentId}
        ></TESTCommentList>
      )}
    </CommentBlock>
  );
};

const TESTCommentList = ({
  comments,
  loggedInUser,
  selectedCommentId,
  handleDeleteClick,
  handleReplyClick,
  isReply = false,
  setSelectedCommentId,
}) => {
  return (
    <CommentListBlock>
      {/* comment list */}
      {!isReply &&
        comments &&
        comments.map((comment) => (
          <TESTComment
            key={comment.id}
            comment={comment}
            loggedInUser={loggedInUser}
            selectedCommentId={selectedCommentId}
            handleDeleteClick={handleDeleteClick}
            handleReplyClick={handleReplyClick}
            isReply={isReply}
            setSelectedCommentId={setSelectedCommentId}
          ></TESTComment>
        ))}
      {/* reply list */}
      {isReply &&
        comments &&
        comments.map((reply) => (
          <TESTComment
            key={reply.id}
            comment={reply}
            loggedInUser={loggedInUser}
            selectedCommentId={selectedCommentId}
            handleDeleteClick={handleDeleteClick}
            handleReplyClick={handleReplyClick}
            isReply={isReply}
            setSelectedCommentId={setSelectedCommentId}
          ></TESTComment>
        ))}
    </CommentListBlock>
  );
};

export default TESTCommentList;
