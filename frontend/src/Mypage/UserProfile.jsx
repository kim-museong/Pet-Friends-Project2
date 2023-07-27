import React from 'react';
import UserInformation from "./UserInformation";
import UserActivity from "./UserActivity";
import styled from "styled-components";



const Profile = styled.div`
  .user-profile {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }`


function UserProfile({ user, postCount, commentCount }) {

    return (
        <Profile>
            <div className="user-profile">
                <h2>마이페이지</h2>
                <UserInformation user={user} />
                <UserActivity postCount={postCount} commentCount={commentCount} />
                {/*<PostList postList={postList} /> /!* 수정된 부분 *!/*/}
            </div>
        </Profile>
    );
}

export default UserProfile;
