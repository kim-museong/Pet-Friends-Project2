import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PostList from "./PostList";
import axios from "axios";


const UserActivityContainer = styled.div`
  a {

    background-color: rgb(255, 140, 0);
    color: white;
    padding: 10px 40px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 40px;
    font-weight: bold;
  }

  .user-activity {
    margin-top: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    font-size: 16px;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
    font-size: 18px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  h3 {
    text-align: center;
  }

  h2 {
    margin-bottom: 100px;
  }

  .timeline {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

function UserActivity() {
    const [postCount, setPostCount] = useState(0);
    const [setCommentCount] = useState(0);
    const [showPostList, setShowPostList] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const handleShowPostList = () => {
        setShowPostList(!showPostList);
    };

    useEffect(() => {
        // 게시글 수와 댓글 수를 가져오는 API 요청
        axios.get('/api/users/current/post-count') ///api/users/current/post-count
            .then(response => {
                const {postCount} = response.data;
                setPostCount(postCount);
            })
            .catch(error => {
                console.error('게시글 수를 가져오지 못했습니다:', error);
            });

    }, [currentUserId]);

    return (
        <UserActivityContainer>
            {/* 사용자 정보와 게시글, 댓글 수를 표시하는 부분 */}
            <div className="user-activity">
                <h3>활동 정보</h3>
                <table>
                    <thead>
                    <tr>
                        <th>작성한 게시글 수</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{postCount}</td>

                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="timeline">
                <a href="#" onClick={handleShowPostList}>
                    내가 작성한 글보기
                </a>
            </div>
            {showPostList && <PostList userId={currentUserId}/>}
        </UserActivityContainer>
    );
}

export default UserActivity;
