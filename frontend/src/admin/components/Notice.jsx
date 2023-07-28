import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { tokens } from '../theme';

const NoticePost = () => {
  const [posts, setPosts] = useState([]);
  const theme = useTheme();
  const { palette } = theme;
  const { primary, common } = palette;
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get('/board/notice/posts')
      .then((response) => {
        const posts = response.data.posts;
        posts.map((post) => (post.nickname = post.User.nickname));
        setPosts(posts);
        fetchPostDetails(posts); // Call fetchPostDetails after setting posts state
      })
      .catch((error) => {
        console.error('게시글 정보를 가져오지 못했습니다:', error);
      });
  };

  const fetchPostDetails = async (posts) => {
    const fetchUserPromises = posts.map((post) => {
      if (post.UserId !== null) {
        return axios.get(`/users/${post.UserId}`);
      }
      return null;
    });

    const userResponses = await Promise.all(fetchUserPromises);

    const postsWithDetails = posts.map((post, index) => {
      const userResponse = userResponses[index];
      if (userResponse) {
        return {
          ...post,
          nickname: userResponse.data.nickname,
          title: post.NoticeDetail ? post.NoticeDetail.title : '',
        };
      }
      return post;
    });

    setPosts(postsWithDetails);
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'nickname', headerName: '닉네임', flex: 1 },
    { field: 'title', headerName: '제목', flex: 1 },
    { field: 'view', headerName: '조회수', flex: 1 },
    { field: 'createdAt', headerName: '작성일자', flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="flex-end" mb={3}></Box>
      <Box
        m="40px 0 0 0"
        height="38vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={posts} columns={columns} />
      </Box>
    </Box>
  );
};

export default NoticePost;
