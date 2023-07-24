import styled from 'styled-components';
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import SubButton from './SubButton';

const PostsBox = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`;

const PopularpostBox = styled.div`
  width: 100%;
  height: 370px;
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  padding: 15px 20px 0;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45, 45, 45)' : '')};

  ol {
    margin: 12px 0;
    padding: 10px;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')};
  }
`;

const Postlist = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  background: inherit;
  font-size: 14px;

  svg {
    color: red;
    font-size: 20px;
    margin-right: 10px;
  }

  .postNumber {
    width: 20px;
    height: 20px;
    background: ${palette.mainColor};
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    padding-top: 2px;
    margin-right: 10px;
    text-align: center;
    color: white;
  }

  .title {
    display: inline-block;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    color: ${({ theme }) => (theme === 'true' ? `${palette.border}` : 'rgb(50, 50, 50)')};
  }

  .add-list {
    font-size: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-top: 14px;

    &:hover {
      text-decoration: underline;
    }
  }

  h2 {
    color: ${palette.mainColor};
  }
`;

const NotPost = styled.div`
  text-align: center;
  margin-top: 120px;
  font-size: 20px;
  color: ${palette.border};
`;

const Popularpost = ({ pupularPosts, theme }) => {
  return (
    <PostsBox>
      <SubButton />
      <PopularpostBox theme={String(theme)}>
        <ListBox theme={String(theme)}>
          <h2>인기 게시물</h2>

          <Link to="/community" className="add-list">
            더보기
            <MdChevronRight />
          </Link>
        </ListBox>
        <hr style={{ marginTop: '10px' }} />
        <ol>
          {pupularPosts?.map((post, index) => (
            <Postlist key={post.id} theme={String(theme)}>
              <div className="postNumber">{index + 1}</div>
              <div className="postInfo">
                <span className="title">{post.CommunityDetail?.title}</span>
              </div>
            </Postlist>
          ))}
          {pupularPosts?.length === 0 && (
            <>
              <NotPost>게시물이 없습니다.</NotPost>
            </>
          )}
        </ol>
      </PopularpostBox>
    </PostsBox>
  );
};

export default Popularpost;
