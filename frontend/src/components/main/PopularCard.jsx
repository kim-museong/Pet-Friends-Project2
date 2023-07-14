import styled, { css } from 'styled-components';
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const PopularCardBox = styled.div`
  border: 1px solid ${palette.border};
  padding: 20px;
  margin-top: 20px;
  margin-right: 20px;
  div {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .title {
    justify-content: space-between;
    margin: 10px 30px 20px;
  }
`;

const PictureItemBlock = styled.div`
  display: flex;
  border: 1px solid green;
  width: 250px;
  height: 200px;
  margin: 10px;
  // ↓ 나중에 수정
  ${({ imgurl }) =>
    imgurl &&
    css`
      background-image: url('${imgurl}');
      background-size: cover;
      background-position: center;
    `}
  cursor: pointer;
`;

const PopularCard = ({ posts }) => {
  return (
    <>
      <PopularCardBox>
        <div className="title">
          <h2>인기 사진</h2>
          <Link to="/picture" className="add-list">
            더보기
            <MdChevronRight />
          </Link>
        </div>
        <div>
          {posts?.map((post) => (
            <PictureItemBlock key={post.id} post={post} imgurl={post && post.imgUrl}></PictureItemBlock>
          ))}
        </div>
      </PopularCardBox>
    </>
  );
};

export default PopularCard;
