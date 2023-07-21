import styled from 'styled-components';
import { PiPencilSimpleLineDuotone } from 'react-icons/pi';
import { BiArrowToTop, BiSearch } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import palette from '../../../lib/styles/palette';

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
    top: 83px;
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

const Memo = ({ user, memos, top, show, search, showSearch, formattedTime, onChange, searchClear, searchEnter }) => {
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

      {memos &&
        memos?.map((memo, index) => (
          <Posts key={index} to={`/memo/${nickname}/${memo.id}`}>
            <div className="title">{memo.content}</div>
            <div className="date">{formattedTime(memo.createdAt)}</div>
          </Posts>
        ))}

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
