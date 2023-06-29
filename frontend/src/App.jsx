import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import CommunityPage from './pages/CommunityPage';
import InformationPage from './pages/InformationPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';
import NoticePage from './pages/NoticePage';
import PicturePage from './pages/PicturePage';
import PostDetailPage from './pages/PostDetailPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <Routes>
      {/* 메인페이지 */}
      <Route path="/" element={<MainPage />}></Route>

      {/* 로그인, 회원가입 페이지 */}
      <Route path="/auth">
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
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

      {/* 게시글 상세 정보 */}
      <Route path="/notice/:postId" element={<PostDetailPage />}></Route>
      <Route path="/information/:postId" element={<PostDetailPage />}></Route>
      <Route path="/picture/:postId" element={<PostDetailPage />}></Route>
      <Route path="/community/:postId" element={<PostDetailPage />}></Route>

      {/* Not Found 페이지 */}
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default App;
