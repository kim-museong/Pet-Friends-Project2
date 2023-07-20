import React, {useState, useEffect} from 'react';
import {
    Box,
    IconButton,
    useTheme,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import Header from '../components/Header';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {tokens} from '../theme';

const AdminUser = () => {
    const theme = useTheme();
    const {palette} = theme;
    const {primary, common} = palette;
    const colors = tokens(theme.palette.mode);
    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'nickname', headerName: '닉네임', flex: 1, cellClassName: 'name-column--cell',},
        {field: 'userId', headerName: '회원 아이디', flex: 1,},
        {field: 'rank', headerName: '등급', flex: 1,
            renderCell: (params) => (
                <>
                    {params.row.rank}
                    <IconButton onClick={() => handleRankChange(params.row, 'up')} size="small">
                        <ArrowUpwardIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleRankChange(params.row, 'down')} size="small">
                        <ArrowDownwardIcon/>
                    </IconButton>
                </>
            ),
        },
        {field: 'address2', headerName: '주소', flex: 1,},
        {field: 'createdAt', headerName: '가입일자', flex: 1,
            renderCell: (params) => (
                <>
                    {params.row.createdAt}
                    <button onClick={() => handleDeleteConfirmation(params.row)} size="small"
                            style={{
                                marginLeft: '8px',
                                padding: '6px 12px',
                                background: primary.main,
                                color: common.white,
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                        회원탈퇴
                    </button>
                    <Dialog open={selectedUser === params.row} onClose={() => setSelectedUser(null)}>
                        <DialogTitle>회원 탈퇴</DialogTitle>
                        <DialogContent>
                            <p>정말 이 회원님을 탈퇴시키겠습니까?</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelectedUser(null)}>취소</Button>
                            <Button onClick={() => handleDeleteUser(params.row.id)} color="error">
                                확인
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            ),
        },
    ];

    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedField, setSelectedField] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios
            .get('/api/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('사용자 정보를 가져오지 못했습니다:', error);
            });
    }, []);

    const handleRankChange = (user, direction) => {
        const updatedUsers = users.map((u) => {
            if (u.id === user.id) {
                let updatedRank;
                if (direction === 'up') {
                    updatedRank = u.rank + 1;
                } else if (direction === 'down') {
                    updatedRank = u.rank - 1;
                }
                const updatedUser = {...u, rank: updatedRank};
                axios
                    .put(`/api/users/${user.id}`, {rank: updatedRank})
                    .then((response) => {
                        console.log('등급 업데이트 성공:', response.data);
                    })
                    .catch((error) => {
                        console.error('등급 업데이트 실패:', error);
                    });
                return updatedUser;
            }
            return u;
        });

        setUsers(updatedUsers);
    };

    const handleDeleteConfirmation = (user) => {
        setSelectedUser(user);
    };

    const handleDeleteUser = (userId) => {
        axios
            .delete(`/api/users/${userId}`)
            .then((response) => {
                console.log('사용자 삭제 성공:', response.data);
                const updatedUsers = users.filter((user) => user.id !== userId);
                setUsers(updatedUsers);
            })
            .catch((error) => {
                console.error('사용자 삭제 실패:', error);
            })
            .finally(() => {
                setSelectedUser(null);
            });
    };

    const handleSearch = () => {
        let filteredUsers = users;

        if (selectedField !== 'all') {
            filteredUsers = users.filter((user) =>
                user[selectedField].toLowerCase().includes(searchText.toLowerCase())
            );
        } else {
            filteredUsers = users.filter((user) =>
                Object.values(user)
                    .join(' ')
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );
        }

        return filteredUsers;
    };

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };

    const filteredUsers = handleSearch();

    return (
        <Box m="20px">
            <Header title="회원정보"/>
            <Box
                m="58px 0 0 0"
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
                    <Select value={selectedField} onChange={handleFieldChange} sx={{ml: 2}}>
                        <MenuItem value="all">전체</MenuItem>
                        <MenuItem value="nickname">닉네임</MenuItem>
                        <MenuItem value="userId">회원 아이디</MenuItem>
                        <MenuItem value="rank">등급</MenuItem>
                        <MenuItem value="address2">주소</MenuItem>
                        <MenuItem value="createdAt">가입일자</MenuItem>
                    </Select>
                    <InputBase
                        sx={{ml: 2, flex: 1}}
                        placeholder="검색"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <IconButton type="button" sx={{p: 1}}>

                    </IconButton>
                </Box>
                <DataGrid checkboxSelection rows={filteredUsers} columns={columns}/>
            </Box>
        </Box>
    );
};

export default AdminUser;
