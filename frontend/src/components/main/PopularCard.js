import styled, { css } from 'styled-components';
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PopularCardBox = styled.div`
  border: 1px solid rgb(186, 186, 186);
  padding: 10px;
  margin-top: 20px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PictureItemBlock = styled.div`
  display: flex;
  border: 1px solid green;
  width: 300px;
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
      <h2>인기 사진</h2>
      <Link to="/picture" className="add-list">
        더보기
        <MdChevronRight />
      </Link>
      <PopularCardBox>
        {posts?.map((post) => (
          <PictureItemBlock key={post.id} post={post} imgurl={post && post.imgUrl}></PictureItemBlock>
        ))}
      </PopularCardBox>
    </>
  );
};

export default PopularCard;
