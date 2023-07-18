import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import CommentInputContainer from '../../containers/comment/CommentInputContainer';
import ReplyListContainer from '../../containers/comment/ReplyListContainer';

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

const Comment = ({ user, comment, postId, handleDeleteClick, handleReplyClick, selectedCommentId }) => {
  return (
    <CommentBlock>
      {/* comment description + delete button */}
      <CommentHeader>
        <div>
          <CommentNickname>{comment.User.nickname}</CommentNickname>
          <CommentCreatedAt>{comment.createdAt}</CommentCreatedAt>
        </div>
        {user && comment.UserId === user.id && (
          <CommentDeleteButton onClick={() => handleDeleteClick(comment.id)}>
            <AiOutlineClose />
          </CommentDeleteButton>
        )}
      </CommentHeader>
      {/* comment content + reply button */}
      <CommentContent>
        <span>{comment.content}</span>
        {user && <CommentReplyButton onClick={() => handleReplyClick(comment.id)}>대댓글</CommentReplyButton>}
      </CommentContent>
      {/* reply editor */}
      {comment.id === selectedCommentId && <CommentInputContainer parentCommentId={comment.id} />}
      {/* reply list */}
      <ReplyListContainer
        replies={comment.Replies}
        user={user}
        postId={postId}
        parentCommentId={comment.id}
      ></ReplyListContainer>
    </CommentBlock>
  );
};

const CommentList = ({ user, postId, comments, handleDeleteClick, handleReplyClick, selectedCommentId }) => {
  return (
    <CommentListBlock>
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            user={user}
            comment={comment}
            postId={postId}
            handleDeleteClick={handleDeleteClick}
            handleReplyClick={handleReplyClick}
            selectedCommentId={selectedCommentId}
          ></Comment>
        ))}
    </CommentListBlock>
  );
};

export default CommentList;
