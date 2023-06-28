import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/auth">
                <Route path="login" element={<LoginPage />}></Route>
                <Route path="register" element={<RegisterPage />}></Route>
            </Route>
            {/* 게시글 목록 */}
            {/* 게시글 상세 정보 */}
        </Routes>
    );
};

export default App;
