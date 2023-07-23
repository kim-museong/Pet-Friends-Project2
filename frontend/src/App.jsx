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
import AttendancePage from './pages/AttendancePage';
import MemoContainer from './containers/main/Memo/MemoContainer';
import MemoWriteContainer from './containers/main/Memo/MemoWriteContainer';
import MemoSearchContainer from './containers/main/Memo/MemoSearchContainer';
import MemoShowContainer from './containers/main/Memo/MemoShowContainer';
import MemoUpdateContainer from './containers/main/Memo/MemoUpdateContainer';

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
        <Route path="/admin" element={<AdminPage />}></Route>

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
        <Route path="/memo/:search" element={<MemoSearchContainer />} />
        <Route path="/memo/write" element={<MemoWriteContainer />} />
        <Route path="/memo/:nickname/:id" element={<MemoShowContainer />} />
        <Route path="/memo/:id/update" element={<MemoUpdateContainer />} />
      </Routes>
    </>
  );
};

export default App;
