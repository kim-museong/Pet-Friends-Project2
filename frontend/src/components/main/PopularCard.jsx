import styled, { css } from 'styled-components';
import { MdChevronRight } from 'react-icons/md';
import palette from '../../lib/styles/palette';
import { TbPictureInPicture } from 'react-icons/tb';

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-top: 40px;

  .more {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 10px;
    color: rgb(50, 50, 50);

    svg {
      margin-right: 5px;
      color: ${palette.mainColor};
      font-size: 12px;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    margin-right: 5px;
    color: ${palette.mainColor};
    font-size: 24px;
  }

  .subTitle {
    font-size: 16px;
  }

  .title {
    font-weight: bold;
  }
`;

const PopularCardBox = styled.div`
  margin-top: 10px;
  padding: 20px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};

  div {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
`;

const PictureItemBlock = styled.div`
  display: flex;
  border: 1px solid green;
  width: 32.77%;
  height: 150px;
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

const NotPicture = styled.div`
  margin-top: 50%;
  color: ${palette.border};
  font-size: 20px;
`;

const PopularCard = ({ posts, theme }) => {
  return (
    <>
      <Title>
        <div style={{ display: 'flex' }}>
          <TbPictureInPicture />
          <div>
            <span className="subTitle">마음을 녹이는 동물사진들 , </span>
            <span className="title">사진게시판</span>
          </div>
        </div>
        <div className="more">
          <div>더보기</div>
          <MdChevronRight />
        </div>
      </Title>

      <PopularCardBox theme={String(theme)}>
        <div>
          {posts?.map((post) => (
            <PictureItemBlock key={post.id} post={post} imgurl={post && post.imgUrl}></PictureItemBlock>
          ))}
          {posts?.length === 0 && (
            <NotPicture>
              <div>사진이 없습니다. 예쁜 동물들 사진을 공유해주세요!</div>
            </NotPicture>
          )}
        </div>
      </PopularCardBox>
    </>
  );
};

export default PopularCard;
