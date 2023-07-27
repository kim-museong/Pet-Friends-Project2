import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios';

const PostDetailsDialog = ({ post, boardName, open, onClose, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/api/${boardName}/posts/${post.id}`);
        setContent(response.data.content);
      } catch (error) {
        console.error('Failed to fetch post content:', error);
      }
    };

    fetchContent();
  }, [post.id, boardName]);

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    onClose();
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>제목: {post.title}</DialogTitle>
      <DialogContent>
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
