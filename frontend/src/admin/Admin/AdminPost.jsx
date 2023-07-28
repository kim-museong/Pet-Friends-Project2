import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    useTheme,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../components/Header';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PostDetailsDialog from '../components/PostDetailsDialog';
import { tokens } from '../theme';
import { deletePost } from '../../lib/api/post';

const AdminPost = () => {
    const theme = useTheme();
    const { palette } = theme;
    const { primary, common } = palette;
    const colors = tokens(theme.palette.mode);

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedField, setSelectedField] = useState('all');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/board/community/posts');
            const fetchedPosts = response.data.posts;

            // Fetch user details for each post
            const fetchUserPromises = fetchedPosts.map((post) => {
                if (post.UserId !== null) {
                    return axios.get(`/users/${post.UserId}`);
                }
                return null;
            });

            const userResponses = await Promise.all(fetchUserPromises);

            const postsWithUser = fetchedPosts.map((post, index) => {
                const userResponse = userResponses[index];
                if (userResponse) {
                    return {
                        ...post,
                        title: post.CommunityDetail.title,
                        nickname: userResponse.data.nickname,
                    };
                }
                return post;
            });

            setPosts(postsWithUser);
        } catch (error) {
            console.error('게시글 정보를 가져오지 못했습니다:', error);
        }
    };

    const handleViewPost = async (postId) => {
        const selected = posts.find((post) => post.id === postId);
        setSelectedPost(selected);

        try {
            const response = await axios.get(`/board/community/posts/${postId}`);
            const content = response.data.content;
            setSelectedPost((prevPost) => ({ ...prevPost, content }));
        } catch (error) {
            console.error('Failed to fetch post content:', error);
            setSelectedPost((prevPost) => ({
                ...prevPost,
                content: 'aaaaaaaaaaaaaaaaaaaaaaa',
            }));
        }

        setDialogOpen(true);
    };


    const handleCloseDialog = () => {
        setSelectedPost(null);
        setDialogOpen(false);
    };

    const deletePost = async (postId) => {
        try {
            await axios.delete(`/board/community/posts/${postId}`);
        } catch (error) {
            throw new Error('게시물 삭제에 실패했습니다:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        if (!selectedPost) return;

        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

        if (confirmDelete) {
            try {
                await deletePost(postId);

                // Remove the deleted post from the posts state
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPost.id));

                // Close the dialog
                handleCloseDialog();
            } catch (error) {
                console.error('게시물 삭제에 실패했습니다:', error);
            }
        }
    };


    const handleSearch = () => {
        let filteredPosts = posts;

        if (selectedField !== 'all') {
            filteredPosts = posts.filter((post) =>
                post[selectedField].toLowerCase().includes(searchText.toLowerCase())
            );
        } else {
            filteredPosts = posts.filter((post) =>
                Object.values(post).join(' ').toLowerCase().includes(searchText.toLowerCase())
            );
        }

        return filteredPosts;
    };

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };

    const filteredPosts = handleSearch();

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'nickname', headerName: '닉네임', flex: 1 },
        { field: 'title', headerName: '제목', flex: 1 },
        { field: 'view', headerName: '조회수', flex: 1 },
        { field: 'createdAt', headerName: '작성일자', flex: 1 },
        {
            field: 'actions',
            headerName: '',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <button
                    onClick={() => handleViewPost(params.row.id)}
                    style={{
                        marginLeft: '8px',
                        padding: '6px 12px',
                        background: primary.main,
                        color: common.white,
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <Typography variant="body2" style={{ color: common.white }}>
                        글 정보 보기
                    </Typography>
                </button>
            ),
        },
    ];



    return (
        <Box m="20px">
            <Header title="게시글 정보" />
            <Box
                m="40px 0 0 0"
                height="75vh"
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
                <Box mb={2} display="flex">
                    <Select value={selectedField} onChange={handleFieldChange} sx={{ ml: 2 }}>
                        <MenuItem value="all">전체</MenuItem>
                        <MenuItem value="nickname">닉네임</MenuItem>
                        <MenuItem value="title">제목</MenuItem>
                        <MenuItem value="createdAt">작성일자</MenuItem>
                    </Select>
                    <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="검색"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    {/*<IconButton type="button" sx={{ p: 1 }}>*/}
                    {/*    <SearchIcon />*/}
                    {/*</IconButton>*/}
                </Box>
                <DataGrid rows={filteredPosts} columns={columns} />
            </Box>
            {selectedPost && (
                <PostDetailsDialog
                    boardName="community"
                    post={selectedPost}
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    onDelete={handleDeletePost}
                    content={selectedPost.content}
                    postDetail={selectedPost.postDetail}

                />

            )}
        </Box>
    );
};

export default AdminPost;
