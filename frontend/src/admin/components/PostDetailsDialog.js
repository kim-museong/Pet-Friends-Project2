import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios';

const PostDetailsDialog = ({ post, boardName, open, onClose, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async (postId) => {
      try {
        const response = await axios.get(`/board/${boardName}/posts/${postId}`);
        // Assuming the response contains 'content' field with post content
        setContent(response.data.content);
      } catch (error) {
        console.error('Failed to fetch post content:', error);
        setContent('포스트 내용을 불러올 수 없습니다.');
        console.log('에러 응답 데이터:', error.response.data);
        console.log('에러 응답 상태:', error.response.status);
        console.log('에러 응답 헤더:', error.response.headers);// Set a default message if there's an error
      }
    };

    if (post && post.id) {
      fetchContent(post.id);
    }
  }, [post, boardName]);

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete(post.id);
    onClose();
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>제목: {post.title}</DialogTitle>
        <DialogContent>
          {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
              <div>포스트 내용이 없습니다.</div>
          )}
        </DialogContent>
        <DialogActions>
          {!confirmDelete ? (
              <>
                <Button onClick={handleDelete} color="error">
                  삭제
                </Button>
                <Button onClick={handleClose} color="error">
                  닫기
                </Button>
              </>
          ) : (
              <>
                <Button onClick={handleConfirmDelete} color="error">
                  확인
                </Button>
                <Button onClick={handleCancelDelete} color="error">
                  취소
                </Button>
              </>
          )}
        </DialogActions>
      </Dialog>
  );
};

export default PostDetailsDialog;
