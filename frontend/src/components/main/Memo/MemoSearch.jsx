import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { HiOutlineBackspace } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { formattedTime } from '../../../lib/main/memo';

const Title = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 30px;
  border-radius: 0;
  background: ${palette.mainColor};
  color: white;
  font-weight: bold;
  font-size: 20px;
  position: relative;

  svg {
    font-size: 26px;
    cursor: pointer;
  }

  .flexBox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: white;
      font-size: 24px;
    }
  }

  .back {
    margin-right: 30px;
    svg {
      font-size: 40px;

      &:hover {
        color: ${palette.border};
      }
    }
  }

  .close {
    position: absolute;
    top: 33px;
    right: 45px;
    color: ${palette.border};

    svg {
      font-size: 20px;
    }

    &:hover {
      color: ${palette.mainColor};
    }
  }

  input {
    display: inline-block;
    width: 100%;
    border: none;
    border-radius: 4px;
    padding: 10px 40px 10px 15px;
    outline: none;
  }
`;

const Posts = styled(Link)`
  display: block;
  padding: 20px 30px;
  border-radius: 0;
  color: black;
  cursor: pointer;

  .title {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .date {
    font-size: 14px;
    color: ${palette.border};
  }

  & + & {
    border-top: 1px solid ${palette.border};
  }

  &:nth-child(even) {
    background: rgba(240, 240, 240, 0.4);
  }
`;

const NotMemo = styled.div`
  text-align: center;
  margin-top: 20%;
  font-size: 20px;
  color: ${palette.border};

  @media (max-width: 500px) {
    margin-top: 45%;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(256, 256, 256, 0.7);
  text-align: center;
  border-radius: 0;
  img {
    margin-top: 18rem;
  }
`;

const MemoSearch = ({ search, memos, user, onChange, searchClear, searchEnter, back, loading }) => {
  const { nickname } = user || '';
  return (
    <>
      <Title>
        <>
          <div className="back" onClick={back}>
            <HiOutlineBackspace />
          </div>
          <input
            name="search"
            placeholder="검색어를 입력하세요."
            autoFocus
            onChange={onChange}
            value={search}
            onKeyDown={searchEnter}
          />
          <div className="close" onClick={searchClear}>
            <AiOutlineCloseCircle />
          </div>
        </>
      </Title>

      {memos &&
        memos?.map((memo, index) => (
          <Posts key={index} to={`/memo/${nickname}/${memo.id}`}>
            <div className="title">{memo.content}</div>
            <div className="date">{formattedTime(memo.createdAt)}</div>
          </Posts>
        ))}
      {memos === null && (
        <>
          <NotMemo>검색결과가 없습니다.</NotMemo>
        </>
      )}

      {loading && (
        <>
          <Loading>
            <img style={{ width: '50px' }} src="../../../../images/spin.gif" alt="로딩중" />
          </Loading>
        </>
      )}
    </>
  );
};

export default MemoSearch;
