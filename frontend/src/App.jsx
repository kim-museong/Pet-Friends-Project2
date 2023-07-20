import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import CommunityPage from './pages/CommunityPage';
import InformationPage from './pages/InformationPage';
import LoginPage from './pages/auth/LoginPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';
import NoticePage from './pages/NoticePage';
import PicturePage from './pages/PicturePage';
import PostDetailPage from './pages/PostDetailPage';
import RegisterPage from './pages/auth/RegisterPage';
import RecoverCredentialsPage from './pages/auth/RecoverCredentialsPage';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import './App.css';
import Setting from './components/common/Setting';
import WritePage from './pages/WritePage';
import AttendancePage from './pages/AttendancePage';
import MemoContainer from './containers/main/MemoContainer';
import MemoWirteContainer from './containers/main/MemoWirteContainer';
import AdminPost from './admin/Admin/AdminPost';
import AdminUser from './admin/Admin/AdminUser';
import Calendar from './admin/Admin/Calender';
import FAQ from './admin/Admin/FAQ';
import HavePet from './admin/Admin/HavePet';
import Editor from './admin/components/Write';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { useMode, ColorModeContext } from './admin/theme';
import Sidebar from './admin/Bar/Sidebar';
import Topbar from './admin/Bar/Topbar';
import { useLocation } from 'react-router-dom'; // useLocation 가져오기

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(30, 30, 30)' : 'white')};
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  }

`;

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [themes, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const showAdmin = location.pathname.includes('/admin');
  return (
    <>
      <Routes></Routes>

      <GlobalStyle theme={String(theme)} />
      <Setting />
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<MainPage />} />
        {/* 로그인, 회원가입 페이지, 유저정보찾기 */}
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="credentials" element={<RecoverCredentialsPage />} />
        </Route>
        {/* 마이페이지 */}
        <Route path="/mypage/:userId" element={<MyPage />}></Route>
        {/* 관리자페이지 */}
        <Route path="/admin/*" />
        {/* 게시판 페이지 */}
        <Route path="/notice" element={<NoticePage />}></Route>
        <Route path="/information" element={<InformationPage />}></Route>
        <Route path="/picture" element={<PicturePage />}></Route>
        <Route path="/community" element={<CommunityPage />}></Route>
        {/* 글쓰기(편집기) 페이지 */}
        <Route path="/editor/post" element={<WritePage />}></Route>
        <Route path="/editor/picture" element={<WritePage />}></Route>
        {/* 게시글 상세 정보 */}
        <Route path="/notice/:postId" element={<PostDetailPage />}></Route>
        <Route path="/information/:postId" element={<PostDetailPage />}></Route>
        <Route path="/picture/:postId" element={<PostDetailPage />}></Route>
        <Route path="/community/:postId" element={<PostDetailPage />}></Route>
        {/* Not Found 페이지 */}
        <Route path="*" element={<NotFoundPage />}></Route>

        <Route path="/attendance" element={<AttendancePage />} />
        {/* 메모장 */}
        <Route path="/memo" element={<MemoContainer />} />
        <Route path="/memo/write" element={<MemoWirteContainer />} />
      </Routes>
      {showAdmin && (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={themes}>
            <CssBaseline />
            <Box display="flex">
              <Sidebar isSidebar={isSidebar} />
              <Box flex="1" display="flex" flexDirection="column">
                <Topbar setIsSidebar={setIsSidebar} />
                <main className="content">
                  <Routes>
                    <Route path="/admin/" element={<AdminPage />} />
                    <Route path="/admin/User" element={<AdminUser />} />
                    <Route path="/admin/Post" element={<AdminPost />} />
                    <Route path="/admin/calendar" element={<Calendar />} />
                    <Route path="/admin/editor" element={<Editor />} />
                    <Route path="/admin/FAQ" element={<FAQ />} />
                    <Route path="/admin/petUser" element={<HavePet />} />
                  </Routes>
                </main>
              </Box>
            </Box>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )}
    </>
  );
};

export default App;
