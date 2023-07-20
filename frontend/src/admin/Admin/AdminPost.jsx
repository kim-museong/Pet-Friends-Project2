import React, {useState, useEffect} from 'react';
import {Box,Typography, useTheme, Select, MenuItem} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import Header from '../components/Header';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import PostDetailsDialog from '../components/PostDetailsDialog';
import {tokens} from '../theme';

const AdminPost = () => {
    const theme = useTheme();
    const {palette} = theme;
    const {primary, common} = palette;
    const colors = tokens(theme.palette.mode);

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedField, setSelectedField] = useState('all');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios
            .get('/api/posts')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('게시글 정보를 가져오지 못했습니다:', error);
            });
    };

    const handleViewPost = (postId) => {
        const selected = posts.find((post) => post.id === postId);
        setSelectedPost(selected);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedPost(null);
        setDialogOpen(false);
    };

    const handleDeletePost = () => {
        if (!selectedPost) return;

        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

        if (confirmDelete) {
            axios
                .delete(`/api/posts/${selectedPost.id}`)
                .then(() => {
                    // 삭제된 게시물을 게시물 목록에서 제거
                    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPost.id));

                    // 다이얼로그 닫기
                    handleCloseDialog();
                })
                .catch((error) => {
                    console.error('게시물 삭제에 실패했습니다:', error);
                });
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
        {field: 'id', headerName: 'ID'},
        {field: 'nickname', headerName: '닉네임', flex: 1},
        {field: 'title', headerName: '제목', flex: 1},
        {field: 'view', headerName: '조회수', flex: 1},
        {field: 'createdAt', headerName: '작성일자', flex: 1},
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
                    <Typography variant="body2" style={{color: common.white}}>
                        글 정보 보기
                    </Typography>
                </button>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="게시글 정보"/>
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
                    <Select
                        value={selectedField}
                        onChange={handleFieldChange}
                        sx={{ml: 2}}
                    >
                        <MenuItem value="all">전체</MenuItem>
                        <MenuItem value="nickname">닉네임</MenuItem>
                        <MenuItem value="title">제목</MenuItem>
                        <MenuItem value="createdAt">작성일자</MenuItem>
                    </Select>
                    <InputBase
                        sx={{ml: 2, flex: 1}}
                        placeholder="검색"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    {/*<IconButton type="button" sx={{ p: 1 }}>*/}
                    {/*    <SearchIcon />*/}
                    {/*</IconButton>*/}
                </Box>
                <DataGrid rows={filteredPosts} columns={columns}/>
            </Box>
            {selectedPost && (
                <PostDetailsDialog
                    post={selectedPost}
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    onDelete={handleDeletePost}
                />
            )}
        </Box>
    );
};

export default AdminPost;
