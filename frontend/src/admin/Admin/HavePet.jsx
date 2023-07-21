import React, {useState, useEffect} from 'react';
import {
    Box,
    CircularProgress,
    Button,
    useTheme,
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';

import PetInfoDialog from '../components/PetinfoDialog';
import {tokens} from "../theme";

const HavePet = () => {
    const theme = useTheme();
    const {palette} = theme;
    const {primary, common} = palette;
    const colors = tokens(theme.palette.mode);

    const [users, setUsers] = useState([]);
    const [, setTotalUsers] = useState(0); // setTotalUsers는 사용하지 않는 변수이므로 더미 변수로 표시
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);
    const [isPetInfoDialogOpen, setPetInfoDialogOpen] = useState(false);

    useEffect(() => {
        axios
            .get('/api/users/pet/1')
            .then((response) => {
                const sortedUsers = response.data.sort((a, b) => b.postCount - a.postCount);
                setUsers(sortedUsers);
                setTotalUsers(sortedUsers.length);
            })
            .catch((error) => {
                console.error('사용자 정보를 가져오지 못했습니다:', error);
            });
    }, []);

    const handlePetInfoClick = (params) => {
        setSelectedUser(params.row);

        axios
            .get(`/api/pets/${params.row.id}`)
            .then((response) => {
                setSelectedPet(response.data);
                setPetInfoDialogOpen(true);
            })
            .catch((error) => {
                console.error('펫 정보를 가져오지 못했습니다:', error);
            });
    };

    const handlePetInfoClose = () => {
        setSelectedUser(null);
        setSelectedPet(null);
        setPetInfoDialogOpen(false);
    };

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'nickname', headerName: '닉네임', flex: 1},
        {field: 'userId', headerName: '회원 아이디', flex: 1},
        {field: 'rank', headerName: '등급', flex: 1},
        {field: 'address2', headerName: '주소', flex: 1},
        {field: 'createdAt', headerName: '가입일자', flex: 1},
        {
            field: 'petInfo',
            headerName: '펫 정보',
            flex: 1,
            renderCell: (params) => (
                <Button
                    onClick={() => handlePetInfoClick(params)}
                    variant="outlined"
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
                    펫 정보 보기
                </Button>
            ),
        },
    ];

    return (
        <Box m="20px">
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
                {users.length > 0 ? (
                    <DataGrid rows={users} columns={columns}/>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress/>
                    </Box>
                )}
            </Box>
            <PetInfoDialog
                isOpen={isPetInfoDialogOpen}
                user={selectedUser}
                pet={selectedPet}
                onClose={handlePetInfoClose}
            />
        </Box>
    );
};

export default HavePet;
