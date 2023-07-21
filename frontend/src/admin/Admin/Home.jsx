import React from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import Header from '../components/Header';

import { tokens } from '../theme';
import BestPosts from "../components/BestPosts";
import BestUsers from "../components/BestUsers";
import AllUsers from "../components/AllUsers";
import NoticePost from "../components/Notice";

const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Header title="Home" />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {/* ADMIN USER */}
                    <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Typography variant="h5" fontWeight="600" mb={2}>
                            </Typography>
                            <AllUsers />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="600" mb={2}>
                                글을 많이 쓴 회원
                            </Typography>
                            <BestUsers />
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* ADMIN POST */}
                    <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Typography variant="h5" fontWeight="600" mb={2}>
                                공지사항
                            </Typography>
                            <NoticePost />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="600" mb={2}>
                                조회수가 높은 글
                            </Typography>
                            <BestPosts />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
