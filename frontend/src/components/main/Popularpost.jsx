import styled from 'styled-components';
import { MdChevronRight } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

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
  justify-content: space-between;
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

  .likeCount {
    color: ${palette.mainColor};
  }
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-radius: 0;
  border-bottom: 1px dashed ${palette.border};

  a {
    color: ${({ theme }) => (theme === 'true' ? `${palette.border}` : 'rgb(50, 50, 50)')};
  }

  .title {
    display: flex;
    align-items: center;

    svg {
      color: ${palette.mainColor};
      margin: 0 7px;
      font-size: 20px;
    }
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
`;

const NotPost = styled.div`
  text-align: center;
  margin-top: 120px;
  font-size: 20px;
  color: ${palette.border};
`;

const Popularpost = ({ like, theme }) => {
  return (
    <PostsBox>
      <PopularpostBox theme={String(theme)}>
        <ListBox theme={String(theme)}>
          <div className="title">
            <BsFillPencilFill />
            <h3>인기 게시물</h3>
          </div>
          <Link to="/community" className="add-list">
            더보기
            <MdChevronRight />
          </Link>
        </ListBox>
        {like === null || like?.length === 0 ? (
          <>
            <NotPost>게시물이 없습니다.</NotPost>
          </>
        ) : (
          <>
            <ol>
              {like?.map((post, index) => (
                <Postlist key={post.id} theme={String(theme)}>
                  <div style={{ display: 'flex' }}>
                    <div className="postNumber">{index + 1}</div>
                    <div className="postInfo">
                      <Link to={`/${post.Board.name}/${post.id}`} className="title">
                        {post.CommunityDetail?.title}
                      </Link>
                    </div>
                  </div>
                  <div className="likeCount">{post.likeCount}</div>
                </Postlist>
              ))}
            </ol>
          </>
        )}
      </PopularpostBox>
    </PostsBox>
  );
};

export default Popularpost;
