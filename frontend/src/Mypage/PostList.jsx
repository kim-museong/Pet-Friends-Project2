import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostListItem from './PostListItem';
import styled from 'styled-components';

const PostListContainer = styled.div`
  .post-list-div {
    border-radius: 8px;
    padding: 12px;
    margin: 10px auto;
    width: 60%;
  }

  .post-list li {
    margin: 10px;
  }
  .content-box {
    border: 2px solid rgb(200, 200, 200);
    border-radius: 12px;
    margin-bottom: 50px;
    padding: 16px;
  }
  .content-box h1 {
    display: none;
  }

  .content-box p {
    padding: 8px;
    word-break: break-all;
  }

  .info-box {
    border: 2px solid rgb(203, 203, 203);
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 12px;
    color: rgb(150, 150, 150);
    margin-bottom: 12px;
  }
  .title-box {
    padding: 10px;
    font-size: 24px;
    font-weight: bold;
  }

  .content-box {
    border: 2px solid rgb(200, 200, 200);
    border-radius: 12px;
    margin-bottom: 50px;
    padding: 16px;
    font-size: 14px;
  }

  .content-box p {
    padding: 8px;
    word-break: break-all;
  }
  h3 span {
    color: #007bff;
    font-weight: bold;
    font-size: 14px;
  }
  .info-box span:first-child {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    color: black;
  }
  .pageBtn{
    background-color: white;
    color: rgb(255, 140, 0) ;
    padding: 5px ;
    border:rgba(235, 173, 38, 0.5) 1px solid;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    margin-right: 10px;
    font-weight: bold;
  }
`;


function PostList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/users/check-auth'); // 로그인 상태를 확인하는 API 엔드포인트
            const isAuthenticated = response.data.isAuthenticated;
            if (isAuthenticated) {
                const userId = response.data.user.id; // 로그인된 유저의 ID를 가져옴
                // 로그인된 유저가 작성한 글 목록을 가져오는 API 요청
                const postsResponse = await axios.get(`/api/posts?userId=${userId}`);
                const postsData = postsResponse.data;
                setPosts(postsData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <PostListContainer>
            {/* 작성한 글 목록을 출력하는 부분 */}
            <h2>게시글 목록</h2>
            <ul className="post-list">
                {currentPosts.map((item) => (
                    <PostListItem key={item.id} post={item} user={item.User || { userId: '', nickname: '' }} />
                ))}
            </ul>
            <div>
                {/* 페이지네이션 버튼을 보여주는 부분 */}
                {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                    <button className='pageBtn' key={pageNumber} onClick={() => handlePaginationClick(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </PostListContainer>
    );
}

export default PostList;