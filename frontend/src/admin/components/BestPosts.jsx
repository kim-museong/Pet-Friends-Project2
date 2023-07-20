import React, {useState, useEffect} from 'react';
import {Box, CircularProgress, Typography, useTheme} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';

import axios from 'axios';
import {tokens} from "../theme";

const BestPost = () => {
    const [posts, setPosts] = useState([]);
    const theme = useTheme();
    const {palette} = theme;
    const {primary, common} = palette;
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        axios
            .get('/api/posts')
            .then((response) => {
                const postsData = response.data;
                const fetchUserPromises = postsData.map((post) => {
                    if (post.UserId !== null) {
                        return axios.get(`/api/users/${post.UserId}`);
                    }
                    return null;
                });

                Promise.all(fetchUserPromises)
                    .then((userResponses) => {
                        const postsWithUser = postsData.map((post, index) => {
                            const userResponse = userResponses[index];
                            if (userResponse) {
                                return {
                                    ...post,
                                    nickname: userResponse.data.nickname,
                                };
                            }
                            return post;
                        });
                        setPosts(postsWithUser);
                    })
                    .catch((error) => {
                        console.error('사용자 정보를 가져오지 못했습니다:', error);
                    });
            })
            .catch((error) => {
                console.error('게시글 정보를 가져오지 못했습니다:', error);
            });
    }, []);

    const handleTopPosts = () => {
        const sortedPosts = [...posts].sort((a, b) => b.view - a.view);
        return sortedPosts.slice(0, 5);
    };

    const topPosts = handleTopPosts();

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'nickname', headerName: '닉네임', flex: 1},
        {field: 'title', headerName: '제목', flex: 1},
        {field: 'view', headerName: '조회수', flex: 1},
        {field: 'createdAt', headerName: '작성일자', flex: 1},
    ];

    return (
        <Box m="20px">
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
                <DataGrid rows={topPosts} columns={columns}/>
            </Box>
        </Box>
    );
};

export default BestPost;
