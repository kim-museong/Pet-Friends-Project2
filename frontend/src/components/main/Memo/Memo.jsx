import styled from 'styled-components';
import { PiPencilSimpleLineDuotone } from 'react-icons/pi';
import { BiArrowToTop, BiSearch } from 'react-icons/bi';
import { CiMemoPad } from 'react-icons/ci';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import palette from '../../../lib/styles/palette';
import { formattedTime } from '../../../lib/main/memo';

const Title = styled.div`
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

  .close {
    position: absolute;
    top: 80px;
    right: 40px;
    color: ${palette.border};

    svg {
      font-size: 20px;
    }

    &:hover {
      color: ${palette.mainColor};
    }
  }

  input {
    width: 100%;
    border: none;
    border-radius: 4px;
    padding: 10px 40px 10px 15px;
    margin-top: 20px;
    outline: none;
  }
`;

const MemoCount = styled.div`
  padding: 20px 40px;
  font-size: 20px;
  font-weight: bold;
  color: ${palette.mainColor};
  text-align: center;
`;

const Main = styled.div`
  padding: 5px 10px;
  margin-bottom: 50px;
`;

const WriteBtn = styled(Link)`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;

  background: ${({ theme }) => (theme === 'true' ? 'rgb(35,35,35)' : 'white')};
  border: 2px solid ${palette.mainColor};
  border-radius: 50%;

  svg {
    font-size: 30px;
    margin: 9px 0 0 8.5px;
    color: ${({ theme }) => (theme === 'true' ? '' : 'rgb(50,50,50)')};
  }

  &:hover {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(80,80,80)' : 'rgb(245,245,245)')};
    svg {
      color: ${palette.mainColor};
    }
  }
`;

const ScrollBtn = styled(WriteBtn)`
  right: 80px;
`;

const Posts = styled(Link)`
  display: block;
  padding: 20px 30px;
  border: 1px solid ${palette.border};
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
    margin-top: 5px;
  }

  &:nth-child(even) {
    background: rgba(240, 240, 240, 0.4);
  }
`;

const NotMemos = styled.div`
  text-align: center;
  color: ${palette.border};
  margin-top: 8rem;

  svg {
    font-size: 100px;
    margin-bottom: 10px;
    color: ${palette.mainColor};
    opacity: 0.2;
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

const Memo = ({ user, memos, top, show, search, loading, showSearch, onChange, searchClear, searchEnter }) => {
  const { nickname } = user || '';
  return (
    <>
      <Title>
        <div className="flexBox">
          <Link to="/memo">메모</Link>
          <BiSearch onClick={showSearch} />
        </div>
        {show && (
          <>
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
        )}
      </Title>
      <MemoCount>전체메모 {memos?.length}</MemoCount>
      <Main>
        {memos &&
          memos?.map((memo, index) => (
            <Posts key={index} to={`/memo/${nickname}/${memo.id}`}>
              <div className="title">{memo.content}</div>
              <div className="date">{formattedTime(memo?.createdAt)}</div>
            </Posts>
          ))}
        {memos?.length === 0 && (
          <NotMemos>
            <CiMemoPad />
            <div>메모가 없습니다.</div>
            <div>필요한 내용을 간단하게 적고 정리해보세요.</div>
          </NotMemos>
        )}
      </Main>

      {loading && (
        <>
          <Loading>
            <img style={{ width: '50px' }} src="../../../../images/spin.gif" alt="로딩중" />
          </Loading>
        </>
      )}
      <WriteBtn to="/memo/write">
        <PiPencilSimpleLineDuotone />
      </WriteBtn>
      <ScrollBtn onClick={top}>
        <BiArrowToTop />
      </ScrollBtn>
    </>
  );
};

export default Memo;
