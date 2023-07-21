import styled from 'styled-components';
import { HiOutlineBackspace, HiOutlineTrash } from 'react-icons/hi';
import { MdEditNote } from 'react-icons/md';
import palette from '../../../lib/styles/palette';

const Title = styled.div`
  padding: 10px 20px;
  background: ${palette.mainColor};
  border-radius: 0;

  svg {
    font-size: 32px;
    margin-right: 10px;
    color: white;
    cursor: pointer;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Main = styled.div`
  .nick {
    color: black;
    font-size: 14px;
    font-weight: bold;
  }

  .date {
    font-size: 14px;
    color: rgb(150, 150, 150);
    border-bottom: 1px solid ${palette.border};
    border-radius: 0;
    padding: 20px;
  }

  span + span:before {
    content: '|';
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }

  .content {
    padding: 20px;
  }
`;

const MemoShow = ({ memo, user, back, formattedTime, update }) => {
  const { nickname } = user || '';
  return (
    <>
      <Title>
        <FlexBox>
          <div className="back" onClick={back}>
            <HiOutlineBackspace />
          </div>
          <FlexBox>
            <div>
              <MdEditNote onClick={update} />
            </div>
            <div>
              <HiOutlineTrash />
            </div>
          </FlexBox>
        </FlexBox>
      </Title>
      <Main>
        <div className="date">
          <span className="nick">{nickname}</span>
          <span>{formattedTime(memo.createdAt)}</span>
        </div>
        <div className="content">{memo.content}</div>
      </Main>
    </>
  );
};

export default MemoShow;
