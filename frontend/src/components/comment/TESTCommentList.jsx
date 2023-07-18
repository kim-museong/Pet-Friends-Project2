import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import TESTCommentInput from './TESTCommentInput';

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

const TESTComment = ({ isReply }) => {
  return (
    <CommentBlock>
      {/* comment description + delete button */}
      <CommentHeader>
        <div>
          <CommentNickname>{'댓글 닉네임'}</CommentNickname>
          <CommentCreatedAt>{'댓글 작성일'}</CommentCreatedAt>
        </div>
        <CommentDeleteButton>
          {/* <CommentDeleteButton onClick={() => handleDeleteClick(comment.id)}> */}
          <AiOutlineClose />
        </CommentDeleteButton>
      </CommentHeader>
      {/* comment content + reply button */}
      <CommentContent>
        <span>{'댓글 내용'}</span>
        <CommentReplyButton>대댓글</CommentReplyButton>
        {/* <CommentReplyButton onClick={() => handleReplyClick(comment.id)}>대댓글</CommentReplyButton> */}
      </CommentContent>

      {/* comment input */}
      {/* <TESTCommentInput></TESTCommentInput> */}

      {/* reply list container */}

      {!isReply && <TESTCommentList isReply={1}></TESTCommentList>}
    </CommentBlock>
  );
};

const TESTCommentList = ({ isReply }) => {
  return (
    <>
      {!isReply && (
        <>
          <TESTComment></TESTComment>
          <TESTComment></TESTComment>
          <TESTComment></TESTComment>
          <TESTComment></TESTComment>
          <TESTComment></TESTComment>
        </>
      )}
      {isReply && (
        <>
          <TESTComment isReply={isReply}></TESTComment>
          <TESTComment isReply={isReply}></TESTComment>
        </>
      )}
    </>
  );
};

export default TESTCommentList;
