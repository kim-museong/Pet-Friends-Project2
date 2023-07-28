import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios';

const PostDetailsDialog = ({ post, boardName, open, onClose, onDelete, content, postDetail }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fetchedContent, setFetchedContent] = useState('');

  useEffect(() => {
    const fetchContent = async (postId) => {
      try {
        const response = await axios.get(postDetail); // Replace 'postDetail' with the actual URL from the frontend
        setFetchedContent(response.data.content);
      } catch (error) {
        console.error('Failed to fetch post content:', error);
        setFetchedContent('1111111111111111111');
      }
    };

    if (post && post.id) {
      fetchContent(post.id);
    }
  }, [post, boardName, postDetail]);


  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/board/community/posts/${post.id}`);
      onDelete(post.id);
      onClose();
    } catch (error) {
      console.error('게시물 삭제에 실패했습니다:', error);
    }
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
