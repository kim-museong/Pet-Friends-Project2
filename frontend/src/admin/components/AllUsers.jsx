import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import axios from 'axios';
import { tokens } from '../theme';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const theme = useTheme();
  const { palette } = theme;
  const { primary, common } = palette;
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    axios
      .get('/users')
      .then((response) => {
        setUsers(response.data);
        setTotalUsers(response.data.length);
      })
      .catch((error) => {
        console.error('사용자 정보를 가져오지 못했습니다:', error);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'nickname', headerName: '닉네임', flex: 1 },
    { field: 'userId', headerName: '회원 아이디', flex: 1 },
    { field: 'rank', headerName: '등급', flex: 1 },
    { field: 'createdAt', headerName: '가입일자', flex: 1 },
    { field: 'postCount', headerName: '글 개수', flex: 1 },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4">총 유저 수: {totalUsers}</Typography>
      <Box
        m="58px 0 0 0"
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
        {users.length > 0 ? (
          <DataGrid rows={users} columns={columns} />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AllUsers;
