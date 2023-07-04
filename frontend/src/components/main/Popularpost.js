import styled from 'styled-components';
import { MdOutlineLocalFireDepartment, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PopularpostBox = styled.div`
  width: 50%;
  border: 1px solid rgb(186, 186, 186);
  padding: 20px 30px;
  margin-right: 20px;
  overflow: hidden;
`;

const Postlist = styled.li`
  display: flex;
  align-items: end;
  height: 50px;
  border: 1px solid rgb(186, 186, 186);
  padding: 5px 20px;
  margin-top: 20px;

  svg {
    color: red;
    font-size: 30px;
    margin-right: 10px;
  }

  div:nth-child(2) {
    margin-right: 10px;
  }

  div:nth-child(3) {
    font-size: 14px;
    color: rgb(100, 100, 100);
  }

  & + & {
    margin-top: 10px;
  }
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    color: ${({ theme }) => (theme === 'true' ? 'rgb(186,186,186)' : 'rgb(50, 50, 50)')};
  }

  .add-list {
    font-size: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    font-size: 20px;
  }
`;

const Popularpost = ({ posts, theme }) => {
  return (
    <>
      <PopularpostBox>
        <ListBox theme={String(theme)}>
          <h3>인기 게시물</h3>
          <Link to="/community" className="add-list">
            더보기
            <MdChevronRight />
          </Link>
        </ListBox>

        <ol start={1}>
          {posts?.map((post) => (
            <Postlist key={post.id}>
              <MdOutlineLocalFireDepartment />
              <div>
                <div>{post.title}</div>
                <div>
                  {post.User.nickname}({post.User.userId.slice(0, -3) + '***'})
                </div>
              </div>
            </Postlist>
          ))}
        </ol>
      </PopularpostBox>
    </>
  );
};

export default Popularpost;
