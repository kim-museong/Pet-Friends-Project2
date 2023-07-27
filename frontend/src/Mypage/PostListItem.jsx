import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PostBox = styled.div`
  .info-box {
    border: 2px solid rgb(203, 203, 203);
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 14px;
    color: rgb(150, 150, 150);
    margin-bottom: 20px;
  }
  .title-box {
    padding: 10px;
    font-size: 32px;
    font-weight: bold;
  }
  .post-list-div {
    border-radius: 8px;
    padding: 16px;
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
    padding: 20px;
  }

  .content-box p {
    padding: 10px;
    word-break: break-all;
  }
  h3 span {
    color: #007bff;
    font-weight: bold;
  }
  .post-list-div {
    border-radius: 8px;
    padding: 16px;
    margin: 10px auto;
    width: 60%;
  }
  .post-list li {
    margin: 10px;
  }
  .info-box span:first-child {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
    color: black;
  }
`;


function PostListItem({ post }) {
    const { title, createdAt } = post;

    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 여부를 저장하는 상태

    useEffect(() => {
        checkAuthentication();
    }, []);

    useEffect(() => {
        const fetchNickname = async () => {
            try {
                // 사용자의 닉네임을 가져오는 API 요청
                const response = await axios.get(`/api/users/${post.UserId}`);
                setNickname(response.data.nickname);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNickname();
    }, []);

    useEffect(() => {
        fetchContent();
    }, []);

    const checkAuthentication = async () => {
        try {
            const response = await axios.get('/api/users/check-auth'); // 로그인 상태를 확인하는 API 엔드포인트
            const isAuthenticated = response.data.isAuthenticated;
            setIsAuthenticated(isAuthenticated);
        } catch (error) {
            console.error('로그인 상태를 확인하는데 실패했습니다:', error);
        }
    };

    const fetchContent = async () => {
        try {
            // 로그인 여부에 따라 게시물의 내용을 가져오는 API 요청을 다르게 처리
            const userId = isAuthenticated ? 'current' : 1;
            const response = await axios.get(`/api/contents/${post.id}?userId=${userId}`);
            const contentData = response.data;
            setContent(contentData.content);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PostBox>
            <li className="post-list-item">
                <div className="li-box">
                    <div className="title-box">
                        <div>제목: {title}</div>
                    </div>
                    <div className="info-box">
                        <div>
                            <span>{nickname}</span>
                            <span>{createdAt}</span>
                        </div>
                    </div>
                    <div className="content-box">
                        <h3>{content}</h3>
                    </div>
                </div>
            </li>
        </PostBox>
    );
}

export default PostListItem;