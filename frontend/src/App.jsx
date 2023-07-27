import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { PrivateRoute } from './lib/PrivateRoute';
import AuthorityRoute from './lib/AuthorityRoute';
import Permission from './components/auth/Permission';
import MemoContainer from './containers/main/Memo/MemoContainer';
import MemoWriteContainer from './containers/main/Memo/MemoWriteContainer';
import MemoSearchContainer from './containers/main/Memo/MemoSearchContainer';
import MemoShowContainer from './containers/main/Memo/MemoShowContainer';
import MemoUpdateContainer from './containers/main/Memo/MemoUpdateContainer';
import RandomContainer from './containers/main/RandomContainer';
import HeaderContainer from './containers/common/HeaderContainer';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(30, 30, 30)' : 'white')};
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'rgb(30,30,30)')};
  }

  a {
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'rgb(50,50,50)')};
  }

`;

const App = () => {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme);
  const [themes, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const showAdmin = location.pathname.includes('/admin');

  console.log('app 렌더링 시작');

  return (
    <>
      <GlobalStyle theme={String(theme)} />
      <HeaderContainer />
      <Setting />
      <Routes>
        {/* 로그인 하지 않았을 때 접근 가능 */}
        <Route element={<PrivateRoute auth={false} />}>
          {/* 로그인, 회원가입 페이지, 유저정보찾기 */}
          <Route path="/auth">
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="register" element={<RegisterPage />}></Route>
            <Route path="credentials" element={<RecoverCredentialsPage />}></Route>
          </Route>
        </Route>
        {/* 로그인 해야 접근 가능 */}
        <Route element={<PrivateRoute auth={true} />}>
          {/* admin 권한필요 */}
          <Route element={<AuthorityRoute access={'admin'} />}>
            {/* 관리자페이지 */}
            <Route path="/admin/*" />
          </Route>
          {/* member 권한필요 */}
          <Route element={<AuthorityRoute access={'member'} />}>
            {/* 마이페이지 */}
            <Route path="/mypage/:userId" element={<MyPage />}></Route>
            {/* 글쓰기(편집기) 페이지 */}
            <Route path="/editor/post" element={<WritePage />}></Route>
            <Route path="/editor/picture" element={<WritePage />}></Route>
            {/* 출석체크 페이지 */}
            <Route path="/attendance" element={<AttendancePage />} />
            {/* 메모장 */}
            <Route path="/memo" element={<MemoContainer />} />
            <Route path="/memo/:search" element={<MemoSearchContainer />} />
            <Route path="/memo/write" element={<MemoWriteContainer />} />
            <Route path="/memo/:nickname/:id" element={<MemoShowContainer />} />
            <Route path="/memo/:id/update" element={<MemoUpdateContainer />} />
            {/* 랜덤사진 */}
            <Route path="/random" element={<RandomContainer />} />
            {/* 출석페이지 */}
            <Route path="/attendance" element={<AttendancePage />} />
          </Route>
        </Route>

        {/* 권한 필요 없음 */}
        {/* 메인페이지 */}
        <Route path="/" element={<MainPage />} />
        {/* 게시판 페이지 */}
        <Route path="/notice" element={<NoticePage />}></Route>
        <Route path="/information" element={<InformationPage />}></Route>
        <Route path="/picture" element={<PicturePage />}></Route>
        <Route path="/community" element={<CommunityPage />}></Route>
        {/* 게시글 상세 정보 */}
        <Route path="/notice/:postId" element={<PostDetailPage />}></Route>
        <Route path="/information/:postId" element={<PostDetailPage />}></Route>
        <Route path="/picture/:postId" element={<PostDetailPage />}></Route>
        <Route path="/community/:postId" element={<PostDetailPage />}></Route>
        {/* Not Found 페이지 */}
        <Route path="*" element={<NotFoundPage />}></Route>

        {/* 권한 부족 알림 페이지 */}
        <Route path="/permission" element={<Permission />}></Route>
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
                    <Route
                      path="/admin/"
                      element={user && user.rank === 'admin' ? <AdminPage /> : <Navigate to="/" />}
                    />
                    <Route
                      path="/admin/User"
                      element={user && user.rank === 'admin' ? <AdminUser /> : <Navigate to="/" />}
                    />
                    <Route
                      path="/admin/Post"
                      element={user && user.rank === 'admin' ? <AdminPost /> : <Navigate to="/" />}
                    />
                    <Route
                      path="/admin/calendar"
                      element={user && user.rank === 'admin' ? <Calendar /> : <Navigate to="/" />}
                    />
                    <Route
                      path="/admin/editor"
                      element={user && user.rank === 'admin' ? <Editor /> : <Navigate to="/" />}
                    />
                    <Route path="/admin/FAQ" element={user && user.rank === 'admin' ? <FAQ /> : <Navigate to="/" />} />
                    <Route
                      path="/admin/petUser"
                      element={user && user.rank === 'admin' ? <HavePet /> : <Navigate to="/" />}
                    />
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
