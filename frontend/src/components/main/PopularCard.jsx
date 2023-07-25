import styled, { css } from 'styled-components';
import { MdChevronRight } from 'react-icons/md';
import palette from '../../lib/styles/palette';
import { TbPictureInPicture } from 'react-icons/tb';
import { Link } from 'react-router-dom';

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
    color: ${({ theme }) => (theme === 'true' ? `white` : 'rgb(50, 50, 50)')};

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
  height: 500px;
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
  border: ${({ theme }) => (theme === 'true' ? '' : `1px solid ${palette.border}`)};
  width: 32.77%;
  height: 150px;
  // ↓ 나중에 수정
  ${({ imgurl }) =>
    imgurl &&
    css`
      background-image: url('${imgurl}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `}
  cursor: pointer;
`;

const NotPicture = styled.div`
  margin-top: 25%;
  color: ${palette.border};
  font-size: 20px;
  justify-content: center;
`;

const PopularCard = ({ posts, theme }) => {
  return (
    <div>
      <Title theme={String(theme)}>
        <div style={{ display: 'flex' }}>
          <TbPictureInPicture />
          <div>
            <span className="subTitle">마음을 녹이는 동물사진들 , </span>
            <span className="title">사진게시판</span>
          </div>
        </div>
        <div className="more">
          <Link to="/picture">더보기</Link>
          <MdChevronRight />
        </div>
      </Title>

      <PopularCardBox theme={String(theme)}>
        {posts === null || posts?.length === 0 ? (
          <>
            {posts === null && (
              <NotPicture>
                <div>사진이 없습니다. 예쁜 동물들 사진을 공유해주세요!</div>
              </NotPicture>
            )}
          </>
        ) : (
          <>
            <div>
              {posts?.map((post) => (
                <PictureItemBlock
                  key={post.id}
                  post={post}
                  imgurl={post && post.PictureDetail.imgUrl}
                  theme={String(theme)}
                />
              ))}
            </div>
          </>
        )}
      </PopularCardBox>
    </div>
  );
};

export default PopularCard;
