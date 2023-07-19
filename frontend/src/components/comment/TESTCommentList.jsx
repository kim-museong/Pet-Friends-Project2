import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import TESTCommentInputContainer from '../../containers/comment/TESTCommentInputContainer';

const CommentListBlock = styled.div`
  border: 1px solid greenyellow;
  margin-top: 0.5rem;
`;

const CommentBlock = styled.div`
  border: 1px solid purple;
  margin: 0.5rem;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const CommentContent = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
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
  /* border: none; */
  cursor: pointer;
`;

const CommentReplyButton = styled.button`
  margin-left: auto;
  background-color: transparent;
  /* border: none; */
  cursor: pointer;
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
    <CommentBlock>
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
