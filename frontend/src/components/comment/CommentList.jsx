import React from 'react';
import styled from 'styled-components';

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

const Comment = ({ comment, handleDeleteClick, handleReplyClick }) => {
  return (
    <CommentBlock>
      <CommentHeader>
        <div>
          <CommentNickname>{comment.User.nickname}</CommentNickname>
          <CommentCreatedAt>{comment.createdAt}</CommentCreatedAt>
        </div>
        <CommentDeleteButton onClick={() => handleDeleteClick(comment.id)}>X</CommentDeleteButton>
      </CommentHeader>
      <CommentContent>
        <span>{comment.content}</span>
        <CommentReplyButton onClick={() => handleReplyClick(comment.id)}>대댓글</CommentReplyButton>
      </CommentContent>
    </CommentBlock>
  );
};

const CommentList = ({ comments, handleDeleteClick, handleReplyClick }) => {
  return (
    <CommentListBlock>
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleDeleteClick={handleDeleteClick}
            handleReplyClick={handleReplyClick}
          ></Comment>
        ))}
    </CommentListBlock>
  );
};

export default CommentList;
