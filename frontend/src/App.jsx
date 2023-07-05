import React from 'react';
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

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(30, 30, 30)' : 'white')};
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  }

`;

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <>
      <GlobalStyle theme={String(theme)} />
      <Setting />
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<MainPage />}></Route>

        {/* 로그인, 회원가입 페이지, 유저정보찾기 */}
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="credentials" element={<RecoverCredentialsPage />} />
        </Route>

        {/* 마이페이지 */}
        <Route path="/mypage/:userId" element={<MyPage />}></Route>

        {/* 관리자페이지 */}
        <Route path="/admin" element={<AdminPage />}></Route>

        {/* 게시판 페이지 */}
        <Route path="/notice" element={<NoticePage />}></Route>
        <Route path="/information" element={<InformationPage />}></Route>
        <Route path="/picture" element={<PicturePage />}></Route>
        <Route path="/community" element={<CommunityPage />}></Route>

        {/* 글쓰기(편집기) 페이지 */}
        <Route path="/:boardName/write" element={<WritePage />}></Route>

        {/* 게시글 상세 정보 */}
        <Route path="/notice/:postId" element={<PostDetailPage />}></Route>
        <Route path="/information/:postId" element={<PostDetailPage />}></Route>
        <Route path="/picture/:postId" element={<PostDetailPage />}></Route>
        <Route path="/community/:postId" element={<PostDetailPage />}></Route>

        {/* Not Found 페이지 */}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
